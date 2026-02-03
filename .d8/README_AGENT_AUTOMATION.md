# Dominat8.com — Agent Automation (Local)

This folder adds **automation scaffolding** only. It does NOT change the website UI.

## Files
- .d8/agent-queue.json : task queue (queued/running/done/failed)
- .d8/agent-state.json : loop heartbeat/state
- .d8/logs/            : per-task logs
- .d8/scripts/ENQUEUE_AGENT_TASK.ps1 : enqueue a task
- .d8/scripts/RUN_AGENT_LOOP.ps1     : process queue continuously

## Start loop (in a dedicated PowerShell window)
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "C:\Temp\FARMS\Dominat8.com\.d8\scripts\RUN_AGENT_LOOP.ps1" -LoopSleepSeconds 2

## Enqueue examples
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "C:\Temp\FARMS\Dominat8.com\.d8\scripts\ENQUEUE_AGENT_TASK.ps1" -Title "Build" -Command "Set-Location -LiteralPath 'C:\Temp\FARMS\Dominat8.com'; npm run build"

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "C:\Temp\FARMS\Dominat8.com\.d8\scripts\ENQUEUE_AGENT_TASK.ps1" -Title "Lint" -Command "Set-Location -LiteralPath 'C:\Temp\FARMS\Dominat8.com'; npm run lint"