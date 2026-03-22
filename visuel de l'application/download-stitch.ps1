# Script PowerShell pour telecharger les assets Stitch
$API_KEY = "AQ.Ab8RN6LHlLbVy4yG3W_OJq3I1wiYUFmtbMyTq-RZ-vL_A2gbXw"
$PROJECT_ID = "15376714455160995880"

$screens = @(
    @{ ID = "16b170a7248f404b920585b5a2050843"; Name = "01-Logi-Battle-PRD" },
    @{ ID = "asset-stub-assets-13ea904b83084a57b98e0f086c0fafae-1774119115659"; Name = "02-Design-System" },
    @{ ID = "e30ab989b7f24092a1e094dfad0f3a7e"; Name = "03-Plateau-de-Jeu" },
    @{ ID = "cb085e04910e4083bd47f72b26b6fb93"; Name = "04-Accueil-Modules" },
    @{ ID = "af3ce373994a4a54bd9e290dc8124a35"; Name = "05-Gestion-Classes" },
    @{ ID = "9f4bbb8b5d2841488b1e196bf469ae0f"; Name = "06-Tableau-de-Bord" },
    @{ ID = "1907a9c848454e029ff64b094eb78f67"; Name = "07-Gestion-Groupes" },
    @{ ID = "b431e1bd0ab54a2a8ca8801efd5895a0"; Name = "08-Fin-de-Match" }
)

$headers = @{
    "Authorization" = "Bearer $API_KEY"
    "Accept" = "image/png"
}

foreach ($screen in $screens) {
    $url = "https://api.stitch.design/v1/projects/$PROJECT_ID/screens/$($screen.ID)/export.png"
    $outputFile = "$($screen.Name).png"
    
    Write-Host "Downloading $($screen.Name)..."
    
    try {
        Invoke-WebRequest -Uri $url -Headers $headers -OutFile $outputFile -MaximumRedirection 10
        $size = (Get-Item $outputFile).Length
        Write-Host "  OK: $outputFile ($size bytes)" -ForegroundColor Green
    } catch {
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "Done!"
