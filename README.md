# RPS AI

## Background
Many beginner programmers create the classic game of Rock, Paper, Scissors as their first project, as it helps introduce the basic concepts of programming and logic. While it's a great starting point, I wanted to take the challenge a step further by incorporating computer vision into the game to make it more interactive and dynamic. This allowed me to apply my knowledge of machine learning and computer vision, providing a unique and engaging twist on the traditional game.

## Project Overview
The main focus of this project was to train a computer vision model capable of performing multi-class classification to recognize hand gestures representing Rock, Paper, or Scissors. By using computer vision techniques, the model was trained to accurately identify each gesture made by the player in front of a camera.

## Website implementation
To make the game more accessible, I built a small web application using plain JavaScript. The game interface is simple but effective, allowing players to make their move by showing the Rock, Paper, or Scissors gesture in front of their computer's camera. The website captures the player's gesture in real-time and sends it to the model for prediction.

## How it works
Once the player's gesture is captured, the computer vision model processes the image to determine whether the player chose Rock, Paper, or Scissors. After the model identifies the player’s move, the computer randomly selects one of the three options. The results are then compared to determine who won the round, whether the player, the computer, or if it’s a tie.
