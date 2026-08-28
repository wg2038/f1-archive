# 贡献指南 (Contributing Guide)

你好！非常感谢你对 **F1 Archive** 感兴趣！🏎️

这是一个由 F1 业余车迷独立维护的开源项目。无论是帮忙校对某个分站的圈速数据、修正中文车手译名、补充历史赛道图，还是提供代码层面的优化，都非常欢迎！

---

## 🛠️ 本地开发与调试

1. **克隆项目并安装依赖**
   ```bash
   git clone https://github.com/wg2038/f1-archive.git
   cd f1-archive
   npm install
   ```

2. **启动本地开发服务器**
   ```bash
   npm run dev
   ```
   在浏览器中访问 [http://localhost:3000](http://localhost:3000) 即可实时预览修改。

3. **提交前验证**
   ```bash
   npm run lint
   npm run build
   ```
   确保 Lint 和全量静态页面构建正常通过。

---

## 💡 如何参与

- **数据纠错 / 错别字**：直接提 [Issue](https://github.com/wg2038/f1-archive/issues) 或提交包含修改的 Pull Request。
- **功能想法 / 讨论**：如果你有关于圈速对比图、进站策略等有趣的实现想法，欢迎开 Issue 交流！

再次感谢每一位热爱 F1 和开源的朋友！🏁
