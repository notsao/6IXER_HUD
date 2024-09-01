document.addEventListener('DOMContentLoaded', function() {
    // Simulate fetching data
    const jsonData = {
        "playerId": 123,
        "health": 85,
        "armor": 50,
        "hunger": 40,
        "thirst": 60,
        "bank": 15000,
        "cash": 500,
        "job": "Police",
        "streetName": "Vinewood Blvd",
        "area": "Downtown Vinewood",
        "playerCount": 32,
        "stress": 10,
        "stamina": 100
    };

    // Function to update the HUD with JSON data
    function updateHUD(data) {
        document.getElementById('user_id').innerText = 'ID: ' + data.playerId;
        document.getElementById('server_player_count').innerText = 'Players: ' + data.playerCount;
        document.getElementById('bank').innerText = 'Bank: $' + data.bank.toLocaleString();
        document.getElementById('cash').innerText = 'Cash: $' + data.cash.toLocaleString();
        document.getElementById('job').innerText = 'Job: ' + data.job;
        document.getElementById('minimap').innerText = data.streetName + ', ' + data.area;
    };

    function updatePlayerDataItem() {
        // Select all elements with the class 'player_data_item'
        const items = document.querySelectorAll('.player_data_item');

        items.forEach(item => {
            // Find the SVG inside the item
            const svg = item.querySelector('img'); // Assuming SVGs are <img> elements
            
            // Set default border color
            let borderColor = '#ddd';

            // Check the ID of the SVG (using the parent div ID for this example)
            if (svg) {
                const id = item.id; // Assuming divs have IDs matching the data attributes

                switch (id) {
                    case 'health':
                        borderColor = '#f23d3d'; // Red
                        break;
                    case 'armor':
                        borderColor = '#aaa6a6'; // grey
                        break;
                    case 'hunger':
                        borderColor = '#1df907'; // Green
                        break;
                    case 'thirst':
                        borderColor = '#07d4f9'; // blue
                        break;
                    case 'stamina':
                        borderColor = '#ffb600'; // Magenta
                        break;
                    case 'stress':
                        borderColor = '#f300ff'; // pink
                        break;
                    default:
                        borderColor = '#ddd'; // Default color
                }
            }

            let currentValue = 100;

            // Update the progress every second, decrementing from 100 to 0
            setInterval(() => {
                // Ensure value is within 0-100 range
                const clampedValue = Math.min(100, Math.max(0, currentValue));
                const degree = (clampedValue / 100) * 360;

                // Update the border image with dynamic color
                item.style.borderImage = `conic-gradient(${borderColor} ${degree}deg, #ddd ${degree}deg) 1`;
                item.style.borderRadius = '15px';

                currentValue -= 1; // Decrease the value by 1

                // Reset to 100 when it reaches below 0
                if (currentValue < 0) {
                    currentValue = 100;
                }
            }, 1000);
        });
    };

    // Call the function to update the HUD
    updateHUD(jsonData);

    // Call the function to start updating player data items
    updatePlayerDataItem();
});
