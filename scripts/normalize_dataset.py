import json
import os
import shutil
import csv
import re
import sys

SOURCE_BASE = "/Users/cicada/Desktop/Antigravity/speed1/F1_2000_2025"
NET_BASE = "/Users/cicada/Desktop/Antigravity/speed1/net"
PUBLIC_DATA = os.path.join(NET_BASE, "public/data")
PUBLIC_IMAGES = os.path.join(NET_BASE, "public/images")

# Import translation dict from F1_2000_2025/scripts
sys.path.append(os.path.join(SOURCE_BASE, "scripts"))
from translation_dict import (
    DRIVER_NAME_CN,
    CONSTRUCTOR_NAME_CN,
    NATIONALITY_CN,
    RACE_NAME_CN,
    CIRCUIT_NAME_CN,
    translate_driver,
    translate_constructor,
    translate_nationality,
    translate_race,
    translate_circuit,
    translate_status
)

os.makedirs(os.path.join(PUBLIC_DATA, "seasons"), exist_ok=True)
os.makedirs(os.path.join(PUBLIC_IMAGES, "drivers"), exist_ok=True)
os.makedirs(os.path.join(PUBLIC_IMAGES, "cars"), exist_ok=True)
os.makedirs(os.path.join(PUBLIC_IMAGES, "circuits"), exist_ok=True)

# 1. Copy Images
print("--> Copying visual assets...")
for cat in ["drivers", "cars", "circuits"]:
    src_dir = os.path.join(SOURCE_BASE, "images", cat)
    dst_dir = os.path.join(PUBLIC_IMAGES, cat)
    if os.path.exists(src_dir):
        for fname in os.listdir(src_dir):
            if not fname.startswith("."):
                shutil.copy2(os.path.join(src_dir, fname), os.path.join(dst_dir, fname))

def parse_practice_driver(raw_str):
    if not raw_str or not isinstance(raw_str, str):
        return {"name": "N/A", "code": ""}
    raw_str = raw_str.strip()
    match = re.match(r'^(.*?)([A-Z]{3})$', raw_str)
    if match:
        name_part = match.group(1)
        code = match.group(2)
        formatted_name = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', name_part)
        return {"name": formatted_name.strip(), "code": code}
    else:
        formatted_name = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', raw_str)
        return {"name": formatted_name.strip(), "code": ""}

def slugify(text):
    if not text:
        return ""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

# 2. Load Master Data Files
print("--> Loading master database files...")
with open(os.path.join(SOURCE_BASE, "data/drivers/drivers_master.json")) as f:
    drivers_master = json.load(f)

with open(os.path.join(SOURCE_BASE, "data/drivers/drivers_images_meta.json")) as f:
    drivers_images_meta = json.load(f)

with open(os.path.join(SOURCE_BASE, "data/circuits/circuits_master.json")) as f:
    circuits_master = json.load(f)

with open(os.path.join(SOURCE_BASE, "data/cars/cars_master.json")) as f:
    cars_master = json.load(f)

with open(os.path.join(SOURCE_BASE, "data/teams/teams_master.json")) as f:
    teams_master = json.load(f)

with open(os.path.join(SOURCE_BASE, "data/engines/engines_master.json")) as f:
    engines_master = json.load(f)

# 3. Process Seasons (2000-2025)
print("--> Processing 26 seasons with Chinese translations...")
seasons_summary = []
all_races_list = []
constructor_history = {}
driver_career_stats = {}

for did, dinfo in drivers_master.items():
    driver_career_stats[did] = {
        **dinfo,
        "name_cn": translate_driver(did, dinfo.get("full_name", did)),
        "nationality_cn": translate_nationality(dinfo.get("nationality", "")),
        "image": f"/images/drivers/{did}.jpg" if os.path.exists(os.path.join(PUBLIC_IMAGES, "drivers", f"{did}.jpg")) else None,
        "season_records": [],
        "race_entries_list": []
    }

for year in range(2000, 2026):
    season_file = os.path.join(SOURCE_BASE, f"data/seasons/{year}_master.json")
    if not os.path.exists(season_file):
        continue
    with open(season_file) as f:
        sdata = json.load(f)

    races_processed = []
    cumulative_points = {}
    rounds_labels = []

    for race in sdata.get("races", []):
        r_round = race.get("round")
        r_name = race.get("race_name")
        r_name_cn = translate_race(r_name)
        r_slug = slugify(r_name)
        rounds_labels.append(f"R{r_round} {r_name}")

        circuit_info = race.get("circuit", {})
        cid = circuit_info.get("circuitId")
        cname_cn = translate_circuit(cid, circuit_info.get("circuitName", ""))

        # Process Results
        results = race.get("results", []) if isinstance(race.get("results"), list) else []
        winner = None
        pole = None
        fastest_lap_driver = None

        processed_results = []
        for res in results:
            if not isinstance(res, dict):
                continue
            pos = res.get("position")
            pos_text = res.get("positionText", str(pos))
            points_val = float(res.get("points", 0))
            drv = res.get("Driver", {})
            did = drv.get("driverId")
            cons = res.get("Constructor", {})
            con_id = cons.get("constructorId")
            grid = res.get("grid")
            laps = res.get("laps")
            status = res.get("status")
            status_cn = translate_status(status)
            time_obj = res.get("Time")
            time_str = time_obj.get("time") if isinstance(time_obj, dict) else (time_obj if time_obj else status)
            fl = res.get("FastestLap")
            
            drv_name = f"{drv.get('givenName', '')} {drv.get('familyName', '')}".strip()
            drv_name_cn = translate_driver(did, drv_name)
            team_name = cons.get("name", "")
            team_name_cn = translate_constructor(con_id, team_name)

            if pos == "1" or pos == 1:
                winner = {
                    "driver_id": did,
                    "name": drv_name,
                    "name_cn": drv_name_cn,
                    "team": team_name,
                    "team_cn": team_name_cn,
                    "constructor_id": con_id
                }
            if str(grid) == "1":
                pole = {
                    "driver_id": did,
                    "name": drv_name,
                    "name_cn": drv_name_cn,
                    "team": team_name,
                    "team_cn": team_name_cn,
                    "constructor_id": con_id
                }
            if fl and isinstance(fl, dict) and (fl.get("rank") == "1" or fl.get("rank") == 1):
                fl_time = fl.get("Time", {}).get("time") if isinstance(fl.get("Time"), dict) else fl.get("Time")
                fastest_lap_driver = {
                    "driver_id": did,
                    "name": drv_name,
                    "name_cn": drv_name_cn,
                    "team": team_name,
                    "team_cn": team_name_cn,
                    "lap": fl.get("lap"),
                    "time": fl_time,
                    "speed": fl.get("AverageSpeed", {}).get("speed") if isinstance(fl.get("AverageSpeed"), dict) else None
                }

            if did:
                if did not in cumulative_points:
                    cumulative_points[did] = [0.0] * (int(r_round) - 1)
                prev_pts = cumulative_points[did][-1] if cumulative_points[did] else 0.0
                cumulative_points[did].append(prev_pts + points_val)

            processed_results.append({
                "position": pos,
                "positionText": pos_text,
                "points": points_val,
                "driver_id": did,
                "driver_name": drv_name,
                "driver_name_cn": drv_name_cn,
                "driver_code": drv.get("code"),
                "driver_nationality": drv.get("nationality"),
                "driver_nationality_cn": translate_nationality(drv.get("nationality")),
                "constructor_id": con_id,
                "team_name": team_name,
                "team_name_cn": team_name_cn,
                "grid": grid,
                "laps": laps,
                "status": status,
                "status_cn": status_cn,
                "time": time_str,
                "fastest_lap": fl if isinstance(fl, dict) else None
            })

            if did and did in driver_career_stats:
                driver_career_stats[did]["race_entries_list"].append({
                    "season": year,
                    "round": r_round,
                    "race_name": r_name,
                    "race_name_cn": r_name_cn,
                    "circuit_id": cid,
                    "grid": grid,
                    "position": pos_text,
                    "points": points_val,
                    "status": status,
                    "status_cn": status_cn,
                    "constructor_id": con_id,
                    "team_name": team_name,
                    "team_name_cn": team_name_cn
                })

        # Process Qualifying
        qualifying = race.get("qualifying", []) if isinstance(race.get("qualifying"), list) else []
        processed_qualifying = []
        for q in qualifying:
            if not isinstance(q, dict):
                continue
            drv = q.get("Driver", {})
            cons = q.get("Constructor", {})
            q_did = drv.get("driverId")
            q_cid = cons.get("constructorId")
            processed_qualifying.append({
                "position": q.get("position"),
                "number": q.get("number"),
                "driver_id": q_did,
                "driver_name": f"{drv.get('givenName', '')} {drv.get('familyName', '')}".strip(),
                "driver_name_cn": translate_driver(q_did, f"{drv.get('givenName', '')} {drv.get('familyName', '')}".strip()),
                "driver_code": drv.get("code"),
                "driver_nationality": drv.get("nationality"),
                "driver_nationality_cn": translate_nationality(drv.get("nationality")),
                "constructor_id": q_cid,
                "team_name": cons.get("name"),
                "team_name_cn": translate_constructor(q_cid, cons.get("name")),
                "q1": q.get("Q1"),
                "q2": q.get("Q2"),
                "q3": q.get("Q3")
            })

        # Process Sprint
        sprint = race.get("sprint", []) if isinstance(race.get("sprint"), list) else []
        processed_sprint = []
        for sp in sprint:
            if not isinstance(sp, dict):
                continue
            drv = sp.get("Driver", {})
            cons = sp.get("Constructor", {})
            sp_did = drv.get("driverId")
            sp_cid = cons.get("constructorId")
            processed_sprint.append({
                "position": sp.get("position"),
                "positionText": sp.get("positionText", str(sp.get("position"))),
                "points": float(sp.get("points", 0)),
                "driver_id": sp_did,
                "driver_name": f"{drv.get('givenName', '')} {drv.get('familyName', '')}".strip(),
                "driver_name_cn": translate_driver(sp_did, f"{drv.get('givenName', '')} {drv.get('familyName', '')}".strip()),
                "driver_code": drv.get("code"),
                "constructor_id": sp_cid,
                "team_name": cons.get("name"),
                "team_name_cn": translate_constructor(sp_cid, cons.get("name")),
                "grid": sp.get("grid"),
                "laps": sp.get("laps"),
                "status": sp.get("status"),
                "status_cn": translate_status(sp.get("status")),
                "time": sp.get("Time", {}).get("time") if isinstance(sp.get("Time"), dict) else sp.get("status")
            })

        # Process Practice Sessions
        practices = race.get("practices", {}) if isinstance(race.get("practices"), dict) else {}
        processed_practices = {}
        for pkey in ["fp1", "fp2", "fp3"]:
            raw_p = practices.get(pkey, [])
            p_list = []
            if isinstance(raw_p, list):
                for item in raw_p:
                    if isinstance(item, list) and len(item) >= 5:
                        pos = item[0]
                        num = item[1]
                        raw_driver = item[2]
                        team = item[3]
                        time_str = item[4]
                        laps_cnt = item[5] if len(item) > 5 else "N/A"
                        drv_info = parse_practice_driver(raw_driver)
                        
                        p_list.append({
                            "position": pos,
                            "number": num,
                            "driver_name": drv_info["name"],
                            "driver_name_cn": translate_driver(slugify(drv_info["name"]), drv_info["name"]),
                            "driver_code": drv_info["code"],
                            "team_name": team,
                            "team_name_cn": translate_constructor(slugify(team), team),
                            "time": time_str,
                            "laps": laps_cnt
                        })
                    elif isinstance(item, dict):
                        p_list.append(item)
            processed_practices[pkey] = p_list

        race_obj = {
            "season": year,
            "round": r_round,
            "race_name": r_name,
            "race_name_cn": r_name_cn,
            "race_slug": r_slug,
            "date": race.get("date"),
            "time": race.get("time"),
            "circuit": {
                **circuit_info,
                "circuitName_cn": cname_cn
            },
            "winner": winner,
            "pole": pole,
            "fastest_lap": fastest_lap_driver,
            "results": processed_results,
            "qualifying": processed_qualifying,
            "sprint": processed_sprint,
            "practices": processed_practices
        }
        races_processed.append(race_obj)
        all_races_list.append({
            "season": year,
            "round": r_round,
            "race_name": r_name,
            "race_name_cn": r_name_cn,
            "race_slug": r_slug,
            "date": race.get("date"),
            "circuit_name": circuit_info.get("circuitName"),
            "circuit_name_cn": cname_cn,
            "circuit_id": cid,
            "country": circuit_info.get("Location", {}).get("country") if isinstance(circuit_info.get("Location"), dict) else "",
            "winner": winner
        })

    # Fill progression
    total_rounds = len(races_processed)
    for did, pts_list in cumulative_points.items():
        while len(pts_list) < total_rounds:
            last = pts_list[-1] if pts_list else 0.0
            pts_list.append(last)

    # Process driver standings
    d_standings = sdata.get("driver_standings", []) if isinstance(sdata.get("driver_standings"), list) else []
    processed_driver_standings = []
    for ds in d_standings:
        if not isinstance(ds, dict):
            continue
        drv = ds.get("Driver", {})
        did = drv.get("driverId")
        cons_list = ds.get("Constructors", [])
        primary_con = cons_list[0] if (isinstance(cons_list, list) and cons_list) else {}
        con_name = ", ".join([c.get("name", "") for c in cons_list]) if isinstance(cons_list, list) else "N/A"
        con_id = primary_con.get("constructorId", "")
        
        pos = ds.get("position")
        points = float(ds.get("points", 0))
        wins = int(ds.get("wins", 0))

        podiums = 0
        poles = 0
        fastest_laps = 0
        for r in races_processed:
            for res in r["results"]:
                if res["driver_id"] == did:
                    if res["position"] in ["1", "2", "3", 1, 2, 3]:
                        podiums += 1
                    if str(res["grid"]) == "1":
                        poles += 1
                    if res.get("fastest_lap") and (res["fastest_lap"].get("rank") == "1" or res["fastest_lap"].get("rank") == 1):
                        fastest_laps += 1

        d_fullname = f"{drv.get('givenName', '')} {drv.get('familyName', '')}".strip()
        processed_driver_standings.append({
            "position": int(pos) if str(pos).isdigit() else pos,
            "positionText": ds.get("positionText", str(pos)),
            "points": points,
            "wins": wins,
            "podiums": podiums,
            "poles": poles,
            "fastest_laps": fastest_laps,
            "driver_id": did,
            "driver_name": d_fullname,
            "driver_name_cn": translate_driver(did, d_fullname),
            "driver_code": drv.get("code"),
            "driver_nationality": drv.get("nationality"),
            "driver_nationality_cn": translate_nationality(drv.get("nationality")),
            "constructor_id": con_id,
            "team_name": con_name,
            "team_name_cn": translate_constructor(con_id, con_name),
            "image": f"/images/drivers/{did}.jpg" if os.path.exists(os.path.join(PUBLIC_IMAGES, "drivers", f"{did}.jpg")) else None
        })

        if did and did in driver_career_stats:
            driver_career_stats[did]["season_records"].append({
                "season": year,
                "position": pos,
                "points": points,
                "wins": wins,
                "podiums": podiums,
                "poles": poles,
                "fastest_laps": fastest_laps,
                "constructor_id": con_id,
                "team_name": con_name,
                "team_name_cn": translate_constructor(con_id, con_name)
            })

    progression_data = []
    top_driver_ids = [d["driver_id"] for d in processed_driver_standings[:10] if d.get("driver_id")]

    for r_idx in range(total_rounds):
        entry = {
            "round": r_idx + 1,
            "race_name": races_processed[r_idx]["race_name"],
            "race_name_cn": races_processed[r_idx]["race_name_cn"]
        }
        for did in top_driver_ids:
            if did in cumulative_points and r_idx < len(cumulative_points[did]):
                entry[did] = cumulative_points[did][r_idx]
            else:
                entry[did] = 0.0
        progression_data.append(entry)

    # Process constructor standings
    c_standings = sdata.get("constructor_standings", []) if isinstance(sdata.get("constructor_standings"), list) else []
    processed_constructor_standings = []
    for cs in c_standings:
        if not isinstance(cs, dict):
            continue
        cons = cs.get("Constructor", {})
        cid = cons.get("constructorId")
        cname = cons.get("name")
        pos = cs.get("position")
        pts = float(cs.get("points", 0))
        wins = int(cs.get("wins", 0))

        podiums = 0
        poles = 0
        for r in races_processed:
            for res in r["results"]:
                if res["constructor_id"] == cid:
                    if res["position"] in ["1", "2", "3", 1, 2, 3]:
                        podiums += 1
                    if str(res["grid"]) == "1":
                        poles += 1

        processed_constructor_standings.append({
            "position": int(pos) if str(pos).isdigit() else pos,
            "positionText": cs.get("positionText", str(pos)),
            "points": pts,
            "wins": wins,
            "podiums": podiums,
            "poles": poles,
            "constructor_id": cid,
            "team_name": cname,
            "team_name_cn": translate_constructor(cid, cname),
            "nationality": cons.get("nationality"),
            "nationality_cn": translate_nationality(cons.get("nationality"))
        })

        if cid not in constructor_history:
            constructor_history[cid] = {
                "constructor_id": cid,
                "name": cname,
                "name_cn": translate_constructor(cid, cname),
                "nationality": cons.get("nationality"),
                "nationality_cn": translate_nationality(cons.get("nationality")),
                "seasons": []
            }
        constructor_history[cid]["seasons"].append({
            "season": year,
            "position": pos,
            "points": pts,
            "wins": wins,
            "podiums": podiums,
            "poles": poles
        })

    cars_grid = cars_master.get(str(year), [])
    for cg in cars_grid:
        cg["team_name_cn"] = translate_constructor(cg.get("constructor_id"), cg.get("team_name"))

    d_champ = sdata.get("drivers_champion", {})
    if d_champ:
        d_champ["name_cn"] = translate_driver(d_champ.get("driver_id"), d_champ.get("name"))
        d_champ["team_cn"] = translate_constructor(slugify(d_champ.get("team")), d_champ.get("team"))
        d_champ["nationality_cn"] = translate_nationality(d_champ.get("nationality"))

    c_champ = sdata.get("constructors_champion", {})
    if c_champ:
        c_champ["team_name_cn"] = translate_constructor(c_champ.get("constructor_id"), c_champ.get("team_name"))
        c_champ["nationality_cn"] = translate_nationality(c_champ.get("nationality"))

    season_full = {
        "season": year,
        "total_grands_prix": sdata.get("total_grands_prix", len(races_processed)),
        "total_drivers": sdata.get("total_drivers", len(processed_driver_standings)),
        "total_constructors": sdata.get("total_constructors", len(processed_constructor_standings)),
        "drivers_champion": d_champ,
        "constructors_champion": c_champ,
        "point_system_rule": sdata.get("point_system_rule"),
        "fastest_lap_rule": sdata.get("fastest_lap_rule"),
        "sprint_rule": sdata.get("sprint_rule"),
        "engine_era": sdata.get("engine_era"),
        "cars_grid": cars_grid,
        "driver_standings": processed_driver_standings,
        "constructor_standings": processed_constructor_standings,
        "progression_data": progression_data,
        "races": races_processed
    }

    with open(os.path.join(PUBLIC_DATA, f"seasons/{year}.json"), "w") as f:
        json.dump(season_full, f, indent=2)

    seasons_summary.append({
        "season": year,
        "total_grands_prix": season_full["total_grands_prix"],
        "total_drivers": season_full["total_drivers"],
        "total_constructors": season_full["total_constructors"],
        "drivers_champion": d_champ,
        "constructors_champion": c_champ,
        "engine_era": season_full["engine_era"],
        "point_system_rule": season_full["point_system_rule"]
    })

with open(os.path.join(PUBLIC_DATA, "seasons.json"), "w") as f:
    json.dump(seasons_summary, f, indent=2)

# 4. Process Drivers Master Data
print("--> Processing driver aggregates...")
drivers_export = []
for did, dinfo in driver_career_stats.items():
    tot_points = sum(sr["points"] for sr in dinfo["season_records"])
    tot_wins = sum(sr["wins"] for sr in dinfo["season_records"])
    tot_podiums = sum(sr["podiums"] for sr in dinfo["season_records"])
    tot_poles = sum(sr["poles"] for sr in dinfo["season_records"])
    tot_fl = sum(sr["fastest_laps"] for sr in dinfo["season_records"])
    tot_entries = len(dinfo["race_entries_list"])

    teams_list = sorted(list(set(sr["team_name"] for sr in dinfo["season_records"] if sr.get("team_name"))))
    teams_list_cn = sorted(list(set(sr["team_name_cn"] for sr in dinfo["season_records"] if sr.get("team_name_cn"))))
    championship_years = [sr["season"] for sr in dinfo["season_records"] if str(sr["position"]) == "1"]

    drivers_export.append({
        "driver_id": did,
        "full_name": dinfo.get("full_name", did),
        "name_cn": translate_driver(did, dinfo.get("full_name", did)),
        "first_name": dinfo.get("first_name", ""),
        "last_name": dinfo.get("last_name", ""),
        "code": dinfo.get("code", ""),
        "nationality": dinfo.get("nationality", ""),
        "nationality_cn": translate_nationality(dinfo.get("nationality", "")),
        "date_of_birth": dinfo.get("date_of_birth", ""),
        "seasons": dinfo.get("seasons", []),
        "teams": teams_list if teams_list else dinfo.get("teams", []),
        "teams_cn": teams_list_cn,
        "championships": len(championship_years) if championship_years else dinfo.get("championships", 0),
        "championship_years": championship_years,
        "wins": tot_wins if tot_wins > 0 else dinfo.get("wins", 0),
        "podiums": tot_podiums if tot_podiums > 0 else dinfo.get("podiums", 0),
        "poles": tot_poles if tot_poles > 0 else dinfo.get("poles", 0),
        "fastest_laps": tot_fl if tot_fl > 0 else dinfo.get("fastest_laps", 0),
        "points": tot_points if tot_points > 0 else dinfo.get("points", 0),
        "entries": tot_entries if tot_entries > 0 else dinfo.get("entries", 0),
        "image": dinfo["image"],
        "season_records": dinfo["season_records"],
        "recent_races": dinfo["race_entries_list"][-10:]
    })

with open(os.path.join(PUBLIC_DATA, "drivers.json"), "w") as f:
    json.dump(drivers_export, f, indent=2)

# 5. Process Teams Master Data
print("--> Processing teams & constructors...")
teams_export = []
for cid, chist in constructor_history.items():
    tot_points = sum(sr["points"] for sr in chist["seasons"])
    tot_wins = sum(sr["wins"] for sr in chist["seasons"])
    tot_podiums = sum(sr["podiums"] for sr in chist["seasons"])
    tot_poles = sum(sr["poles"] for sr in chist["seasons"])
    championship_years = [sr["season"] for sr in chist["seasons"] if str(sr["position"]) == "1"]
    active_seasons = sorted([sr["season"] for sr in chist["seasons"]])

    matched_team = next((t for t in teams_master if t.get("constructor_id") == cid), None)
    
    team_cars = []
    team_drivers = set()
    for yr, clist in cars_master.items():
        for c in clist:
            if c.get("constructor_id") == cid:
                team_cars.append({
                    "season": int(yr),
                    "chassis": c.get("chassis"),
                    "engine_supplier": c.get("engine_supplier"),
                    "engine_model": c.get("engine_model"),
                    "engine_era": c.get("engine_era")
                })
                for d in c.get("drivers", []):
                    team_drivers.add(d.get("driver_id"))

    teams_export.append({
        "constructor_id": cid,
        "name": chist["name"],
        "name_cn": translate_constructor(cid, chist["name"]),
        "nationality": chist["nationality"] or (matched_team.get("nationality") if matched_team else "International"),
        "nationality_cn": translate_nationality(chist["nationality"] or (matched_team.get("nationality") if matched_team else "International")),
        "headquarters": matched_team.get("headquarters") if matched_team else "N/A",
        "lineage": matched_team.get("lineage") if matched_team else None,
        "active_seasons": active_seasons,
        "championships": len(championship_years),
        "championship_years": championship_years,
        "wins": tot_wins,
        "podiums": tot_podiums,
        "poles": tot_poles,
        "points": tot_points,
        "seasons_history": chist["seasons"],
        "cars": team_cars,
        "drivers": sorted(list(team_drivers))
    })

with open(os.path.join(PUBLIC_DATA, "teams.json"), "w") as f:
    json.dump(teams_export, f, indent=2)

# 6. Process Circuits Master Data
print("--> Processing circuits...")
circuits_export = []
for c in circuits_master:
    cid = c.get("circuit_id")
    circuit_races = [r for r in all_races_list if r["circuit_id"] == cid]
    img_path = f"/images/circuits/{cid}.png" if os.path.exists(os.path.join(PUBLIC_IMAGES, "circuits", f"{cid}.png")) else None

    circuits_export.append({
        **c,
        "name_cn": translate_circuit(cid, c.get("official_name")),
        "country_cn": translate_nationality(c.get("country")),
        "image": img_path,
        "total_grands_prix": len(circuit_races),
        "races_history": circuit_races
    })

with open(os.path.join(PUBLIC_DATA, "circuits.json"), "w") as f:
    json.dump(circuits_export, f, indent=2)

# 7. Process Cars Master Data
print("--> Processing cars catalog...")
cars_export = []
for yr_str, clist in cars_master.items():
    year = int(yr_str)
    for c in clist:
        cid = c.get("constructor_id", "")
        chassis = c.get("chassis", "")
        clean_chassis = chassis.replace("/", "-").replace(" ", "-")
        slug = f"{cid}-{clean_chassis}-{year}".lower()
        
        car_img_filename = f"{cid}_{clean_chassis.lower().replace('-', '_')}.jpg"
        car_img_path = f"/images/cars/{car_img_filename}" if os.path.exists(os.path.join(PUBLIC_IMAGES, "cars", car_img_filename)) else None
        if not car_img_path:
            alt_name = f"{cid}_{slugify(chassis).replace('-', '_')}.jpg"
            if os.path.exists(os.path.join(PUBLIC_IMAGES, "cars", alt_name)):
                car_img_path = f"/images/cars/{alt_name}"

        season_rec = next((s for s in constructor_history.get(cid, {}).get("seasons", []) if s["season"] == year), None)

        cars_export.append({
            "slug": slug,
            "year": year,
            "constructor_id": cid,
            "team_name": c.get("team_name"),
            "team_name_cn": translate_constructor(cid, c.get("team_name")),
            "chassis": chassis,
            "engine_supplier": c.get("engine_supplier"),
            "engine_model": c.get("engine_model"),
            "engine_era": c.get("engine_era"),
            "drivers": c.get("drivers", []),
            "image": car_img_path,
            "season_rank": season_rec["position"] if season_rec else "N/A",
            "season_points": season_rec["points"] if season_rec else 0,
            "season_wins": season_rec["wins"] if season_rec else 0,
            "season_podiums": season_rec["podiums"] if season_rec else 0,
            "season_poles": season_rec["poles"] if season_rec else 0
        })

with open(os.path.join(PUBLIC_DATA, "cars.json"), "w") as f:
    json.dump(cars_export, f, indent=2)

# 8. Precalculate Global Statistics
print("--> Generating all-time statistics (2000-2025)...")
statistics = {
    "most_championships_drivers": sorted(
        [d for d in drivers_export if d["championships"] > 0],
        key=lambda x: (x["championships"], x["wins"], x["points"]),
        reverse=True
    )[:10],
    "most_wins_drivers": sorted(
        [d for d in drivers_export if d["wins"] > 0],
        key=lambda x: (x["wins"], x["podiums"], x["points"]),
        reverse=True
    )[:15],
    "most_podiums_drivers": sorted(
        [d for d in drivers_export if d["podiums"] > 0],
        key=lambda x: (x["podiums"], x["wins"], x["points"]),
        reverse=True
    )[:15],
    "most_poles_drivers": sorted(
        [d for d in drivers_export if d["poles"] > 0],
        key=lambda x: (x["poles"], x["wins"], x["points"]),
        reverse=True
    )[:15],
    "most_fastest_laps_drivers": sorted(
        [d for d in drivers_export if d["fastest_laps"] > 0],
        key=lambda x: (x["fastest_laps"], x["wins"]),
        reverse=True
    )[:15],
    "most_points_drivers": sorted(
        drivers_export,
        key=lambda x: x["points"],
        reverse=True
    )[:15],
    "most_starts_drivers": sorted(
        drivers_export,
        key=lambda x: x["entries"],
        reverse=True
    )[:15],
    "most_championships_teams": sorted(
        [t for t in teams_export if t["championships"] > 0],
        key=lambda x: (x["championships"], x["wins"], x["points"]),
        reverse=True
    )[:10],
    "most_wins_teams": sorted(
        [t for t in teams_export if t["wins"] > 0],
        key=lambda x: (x["wins"], x["podiums"], x["points"]),
        reverse=True
    )[:15],
    "dominant_seasons": sorted(
        [
            {
                "year": s["season"],
                "champion_driver": s["drivers_champion"]["name"] if s.get("drivers_champion") else "N/A",
                "champion_driver_cn": s["drivers_champion"].get("name_cn", "N/A") if s.get("drivers_champion") else "N/A",
                "champion_team": s["constructors_champion"]["team_name"] if s.get("constructors_champion") else "N/A",
                "champion_team_cn": s["constructors_champion"].get("team_name_cn", "N/A") if s.get("constructors_champion") else "N/A",
                "driver_wins": s["drivers_champion"]["wins"] if s.get("drivers_champion") else 0,
                "total_gps": s["total_grands_prix"],
                "win_percentage": round((s["drivers_champion"]["wins"] / s["total_grands_prix"] * 100), 1) if s.get("drivers_champion") and s.get("total_grands_prix") else 0
            }
            for s in seasons_summary
        ],
        key=lambda x: x["win_percentage"],
        reverse=True
    )[:10]
}

with open(os.path.join(PUBLIC_DATA, "statistics.json"), "w") as f:
    json.dump(statistics, f, indent=2)

# 9. Search Summary Index (Compact for fast bilingual autocomplete)
print("--> Generating bilingual search index...")
search_index = {
    "drivers": [{"id": d["driver_id"], "title": d["full_name"], "title_cn": d["name_cn"], "subtitle": f"{d['nationality_cn']} ({d['nationality']}) | {d['wins']} 胜 (Wins)", "type": "driver", "url": f"/driver/{d['driver_id']}"} for d in drivers_export],
    "teams": [{"id": t["constructor_id"], "title": t["name"], "title_cn": t["name_cn"], "subtitle": f"{t['nationality_cn']} | {t['wins']} 胜 (Wins) | {t['championships']} 冠 (Titles)", "type": "team", "url": f"/team/{t['constructor_id']}"} for t in teams_export],
    "circuits": [{"id": c["circuit_id"], "title": c["official_name"], "title_cn": c["name_cn"], "subtitle": f"{c['city']}, {c['country_cn']}", "type": "circuit", "url": f"/circuit/{c['circuit_id']}"} for c in circuits_export],
    "cars": [{"id": c["slug"], "title": f"{c['team_name']} {c['chassis']} ({c['year']})", "title_cn": f"{c['team_name_cn']} {c['chassis']} ({c['year']})", "subtitle": f"Engine: {c['engine_supplier']} {c['engine_model']}", "type": "car", "url": f"/car/{c['slug']}"} for c in cars_export],
    "seasons": [{"id": str(s["season"]), "title": f"{s['season']} Formula 1 Season", "title_cn": f"{s['season']} F1 世界锦标赛赛季", "subtitle": f"Champion: {s['drivers_champion'].get('name_cn', s['drivers_champion']['name']) if s.get('drivers_champion') else 'N/A'}", "type": "season", "url": f"/season/{s['season']}"} for s in seasons_summary]
}

with open(os.path.join(PUBLIC_DATA, "summary.json"), "w") as f:
    json.dump(search_index, f, indent=2)

# 10. Process Sources CSV and Generate Image Attribution Index
print("--> Processing data sources and image licenses...")
sources_list = []
sources_csv_path = os.path.join(SOURCE_BASE, "sources/sources.csv")
if os.path.exists(sources_csv_path):
    with open(sources_csv_path, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            sources_list.append(row)

with open(os.path.join(PUBLIC_DATA, "sources.json"), "w") as f:
    json.dump(sources_list, f, indent=2)

image_sources = {
    "drivers": drivers_images_meta,
    "cars": {
        "source": "Wikimedia Commons / Formula 1 Media Archive",
        "license": "Creative Commons Attribution-ShareAlike 4.0 / Editorial Fair Use",
        "notes": "Standardized motorsport photography of championship-winning chassis."
    },
    "circuits": {
        "source": "Wikimedia Commons / OpenStreetMap / FIA Track Maps",
        "license": "Creative Commons Attribution-ShareAlike 3.0 / Fair Use",
        "notes": "Vector circuit layouts illustrating FIA certified track geometry."
    }
}

with open(os.path.join(PUBLIC_DATA, "image_sources.json"), "w") as f:
    json.dump(image_sources, f, indent=2)

print("==> Bilingual Data Normalization Complete!")
