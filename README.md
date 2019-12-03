# Advanced Web Technologies Coursework

## Table of Contents

- [Advanced Web Technologies Coursework](#advanced-web-technologies-coursework)
  - [Table of Contents](#table-of-contents)
  - [About this applicaiton](#about-this-applicaiton)
  - [How to initialize this repository](#how-to-initialize-this-repository)
    - [Clone the repository](#clone-the-repository)
    - [Running in production mode](#running-in-production-mode)
    - [Before moving forward, make sure to install DOCKER on your machine](#before-moving-forward-make-sure-to-install-docker-on-your-machine)
    - [Build and launch the web application](#build-and-launch-the-web-application)
  - [Bonus](#bonus)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## About this applicaiton

Node.js is a platform built on Chrome's JavaScript runtime for easily building
fast, scalable network applications. Node.js uses an event-driven, non-blocking
I/O model that makes it lightweight and efficient, perfect for data-intensive
real-time applications that run across distributed devices.

## How to initialize this repository

### Clone the repository

```
git clone https://github.com/petruburlacu/python-webtech.git
```

### Running in production mode

From the server files, create a virtual environment and install all of the required dependencies:

**Make sure to have pip and virtualenvironment dependencies installed in your global python modules**

```
python-webtech> cd server
python-webtech/server> virtualenv venv
python-webtech/server> source venv/bin/activate
python-webtech/server> pip install -r requirements.txt
```

NOTE: you might need to install the requirements.txt module globally first before executing it in virtualenvironment

### Before moving forward, make sure to install DOCKER on your machine

Install docker from: https://docs.docker.com/compose/install/

NOTE: Windows and MacOS machines **docker** comes with **docker-compose** preinstalled. For linux machines, please manually install the **docker-compose** as described in the documentation.


You can then build and run the web application with Docker image:

### Build and launch the web application

Under the project's root path:

```
python-webtech> docker-compose -f docker-compose.yml up --build
```

Close the web application:
```
CTRL + C
```

## Bonus

Check all of the running images: 
```
docker ps -a
```

After the application is closed use the below command to clear the cached containers and images:
```
docker system prune -a
```

Manually remove a container:
```
docker rm -f <container-name>
```