# Issue tracker

工单和规格记录在 `DuanJinTaoToday/proxy_web` 的 GitHub Issues 中，使用 `gh` 操作。

- 创建工单使用 `gh issue create`。多行正文使用 `--body-file`。
- 读取工单使用 `gh issue view <number>`，查询工单使用 `gh issue list`。
- 使用 GitHub 原生子 Issue 表示父子关系，使用原生 Issue 依赖记录阻塞关系。
- 使用 `gh issue edit` 管理标签。关闭工单前，通过 `gh issue comment` 记录原因。
- 首次创建工单前，用 `gh repo view --json nameWithOwner` 核对目标仓库。

## Pull requests as a triage surface

**PRs as a request surface: no.**

## Wayfinding

使用带 `wayfinder:map` 标签的 Issue 记录工作地图，并用子 Issue 跟踪任务。
按地图顺序查找未分配且无未关闭阻塞项的任务。领取时分配给执行者，完成时记录结果并关闭工单。
