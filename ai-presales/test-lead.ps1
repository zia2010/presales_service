$body = @{
    name = "Test User"
    email = "test@example.com"
    phone = "+919876543210"
    source = "linkedin"
    niche = "interior design"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:4000/lead" -Method POST -Body $body -ContentType "application/json"
