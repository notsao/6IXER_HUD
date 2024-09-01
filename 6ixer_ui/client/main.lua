

-- Function to gather and send player data
function SendPlayerData(source)
    local QBCore = exports['qb-core']:GetCoreObject()
    local PlayerData = QBCore.Functions.GetPlayerData()
    
    -- Gather the necessary data
    local health = GetEntityHealth(GetPlayerPed(source))
    local armor = GetPedArmour(GetPlayerPed(source))
    local hunger = PlayerData.metadata['hunger']
    local thirst = PlayerData.metadata['thirst']
    local job = PlayerData.job.name
    local jobLabel = PlayerData.job.label
    local cash = PlayerData.money['cash'] or 0
    local bank = PlayerData.money['bank'] or 0
    local playerId = PlayerData.citizenid

    print(health)
    print(armour)
    print(hunger)
    print(thirst)
    print(job)
    print(jobLabel)
    print(cash)
    print(bank)
    print(playerId)

    -- Send the data to the NUI (JavaScript side)
    SendNUIMessage({
        action = "updatePlayerData",
        health = health,
        armor = armor,
        hunger = hunger,
        thirst = thirst,
        job = job,
        jobLabel = jobLabel,
        cash = cash,
        bank = bank,
        playerId = playerId
    })
end

-- Function to start sending data every second
function StartSendingPlayerData(source)
    local src = source

    -- Use a Citizen thread to send data every second
    Citizen.CreateThread(function()
        while true do
            -- Call the function to send player data
            SendPlayerData(src)

            -- Wait 1 second before sending the next update
            Citizen.Wait(1000) -- 1000 milliseconds = 1 second
        end
    end)
end

-- Trigger the data sending function when a player spawns
RegisterNetEvent('playerSpawned')
AddEventHandler('playerSpawned', function()
    local src = source
    StartSendingPlayerData(src)
end)
