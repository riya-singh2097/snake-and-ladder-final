<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page session="true" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snakes and Ladders</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: url('snl.jpg') no-repeat center center/cover;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
        }
        .container {
            text-align: center;
            background: rgba(0, 0, 0, 0.6);
            padding: 20px 40px;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }
        .container h1 {
            font-size: 3rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }
        .container p {
            font-size: 1.2rem;
            margin-bottom: 20px;
        }
        .player-input {
            margin-bottom: 10px;
        }
        .player-input input {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            margin-top: 5px;
        }
        select {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            background: #fff;
            color: #000;
            font-size: 1rem;
            margin-bottom: 15px;
            cursor: pointer;
        }
        select:focus {
            outline: none;
            box-shadow: 0 0 5px #ffcc00;
        }
        button {
            padding: 10px 20px;
            background: #ffcc00;
            border: none;
            border-radius: 5px;
            color: #000;
            font-size: 1rem;
            cursor: pointer;
            transition: 0.3s;
        }
        button:hover {
            background: #e6b800;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Snakes and Ladders</h1>
        <p>Choose the number of players (Min: 2, Max: 4)</p>
        
        <form action="" method="POST">
            <label for="numPlayers">Number of Players:</label>
            <select name="numPlayers" id="numPlayers" required>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            
           
            
            <button type="submit">Start Game</button>
            <button type="button" onclick="window.close()">Exit</button>
        </form>
    </div>

    <script>
        document.getElementById('numPlayers').addEventListener('change', function() {
            let num = parseInt(this.value);
            for (let i = 1; i <= 4; i++) {
                document.getElementById('player' + i).style.display = i <= num ? 'block' : 'none';
            }
        });
    </script>

    <%
        if (request.getMethod().equalsIgnoreCase("POST")) {
            int numPlayers = Integer.parseInt(request.getParameter("numPlayers"));
            String[] players = new String[numPlayers];
            for (int i = 0; i < numPlayers; i++) {
                String playerName = request.getParameter("player" + (i + 1));
                if (playerName != null && !playerName.trim().isEmpty()) {
                    players[i] = playerName;
                }
            }
            session.setAttribute("players", players);
            if(players.length == 4)
            	response.sendRedirect("4players.html"); // Redirecting to the board page
            else if(players.length == 3)
            	response.sendRedirect("3players.html"); 
            else
            	response.sendRedirect("2players.html"); 
        }
    %>
</body>
</html>
