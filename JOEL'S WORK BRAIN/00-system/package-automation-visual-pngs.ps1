param(
  [string]$RunDate = (Get-Date -Format "yyyy-MM-dd"),
  [Parameter(Mandatory = $true)]
  [string]$GeneratedDailyRundownPng,
  [Parameter(Mandatory = $true)]
  [string]$GeneratedOpenItemsPng
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
$configPath = Join-Path $PSScriptRoot "daily-voice-memo-config.json"
$config = Get-Content -Raw -LiteralPath $configPath | ConvertFrom-Json

$referenceFolder = $config.visual_reference_folder
$outboxFolder = Join-Path $root "08-reports\outbox"
$driveOutboxFolder = $config.local_drive_outbox_path

if ([string]::IsNullOrWhiteSpace($referenceFolder)) {
  throw "Missing required config value: visual_reference_folder"
}

if (-not (Test-Path -LiteralPath $referenceFolder)) {
  throw "Configured visual_reference_folder does not exist: $referenceFolder"
}

if ([string]::IsNullOrWhiteSpace($driveOutboxFolder)) {
  throw "Missing required config value: local_drive_outbox_path"
}

if (-not (Test-Path -LiteralPath $driveOutboxFolder)) {
  throw "Configured local_drive_outbox_path does not exist: $driveOutboxFolder"
}

New-Item -ItemType Directory -Force -Path $outboxFolder | Out-Null

$sourceByOutput = @{
  "daily-rundown.png" = @{
    "SourceFile" = $GeneratedDailyRundownPng
    "Label" = "daily-work-map.png"
  }
  "open-items.png" = @{
    "SourceFile" = $GeneratedOpenItemsPng
    "Label" = "open-reminder-snapshot.png"
  }
}

foreach ($outputName in $sourceByOutput.Keys) {
  $source = $sourceByOutput[$outputName].SourceFile
  $referenceLabel = $sourceByOutput[$outputName].Label

  if (-not (Test-Path -LiteralPath $source)) {
    throw "Required current-run generated PNG missing for $referenceLabel`: $source"
  }

  $stableLocal = Join-Path $outboxFolder $outputName
  $datedLocal = Join-Path $outboxFolder ("$RunDate-$outputName")
  $stableDrive = Join-Path $driveOutboxFolder $outputName
  $datedDrive = Join-Path $driveOutboxFolder ("$RunDate-$outputName")

  Copy-Item -LiteralPath $source -Destination $stableLocal -Force
  Copy-Item -LiteralPath $source -Destination $datedLocal -Force
  Copy-Item -LiteralPath $source -Destination $stableDrive -Force
  Copy-Item -LiteralPath $source -Destination $datedDrive -Force
}

Write-Output "Packaged Work Brain visual PNGs from current-run generated poster files."
Write-Output "daily-rundown.png <= $GeneratedDailyRundownPng"
Write-Output "open-items.png <= $GeneratedOpenItemsPng"
