$current_dir = Split-Path $MyInvocation.MyCommand.Path
$from_dir = (Join-Path $current_dir from)
$dest_dir = (Join-Path $current_dir dest)

Write-Host $from_dir

$foldersItem = (Get-ChildItem $from_dir\* -Include *.png,*.pdf -Exclude *.txt -Recurse | Where-Object {$_.Name -match '^202103|202104'} ).FullName 
$destinationPath = $dest_dir
foreach($item in $foldersItem)
{
    Copy-Item $item -Destination $destinationPath
}

