param(
  [Parameter(Mandatory=$true)]
  [string]$ContractId
)

soroban contract invoke `
  --id $ContractId `
  --source alice `
  --network testnet `
  -- ping --caller alice