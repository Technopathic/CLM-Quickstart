import React from "react"
import ReactDOM from "react-dom";
import Matter from "matter-js";

let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Detector = Matter.Detector,
    pi = 3.14159,
    rotateAmount = 100
class Scene extends React.Component {
    state = {
        rectangles: [],
        render: "",
        paddle: "",
        running: "",
        engine:"",
        canvas:""
    }
    //start of mounting
    componentDidMount() {
        //create engine and renderer
        let engine = Engine.create({
            positionIterations: 20
        })
        let render = Render.create({
            element: this.refs.scene,
            engine: engine,
            options: {
                width: 600,
                height: 600,
                wireframes: false
            }
        })
        this.start(engine, render)
    }
    start = (engine, render)=>{
        //add starting stuff!!
        if(!this.state.render.canvas){
          
        }
        let boundaryLeft = Bodies.rectangle(10, 332, 25, 800, { isStatic: true })
        let boundaryRight = Bodies.rectangle(600, 332, 25, 800, { isStatic: true })
        let circle = Bodies.circle(250, 400, 25, { friction: 0, density: 0.1, frictionAir: .01 })
        let paddle = Bodies.rectangle(300, 500, 800, 25, { isStatic: true, friction: 0 })
        let testPlatform = Bodies.rectangle(180, 100, 100, 40, { isStatic: true });
        this.state.rectangles.push(testPlatform)
        //add  stuffto world
        World.add(engine.world, [circle, boundaryRight, boundaryLeft, paddle, testPlatform])
        //run engine and renderer
        Engine.run(engine)
        Render.run(render)
        //update state
        this.setState({ engine:engine, render: render, paddle: paddle, ball: circle, running: true }, () => { console.log(this.state.render) })
        //create collision pair 
        let paddleCircle = [[paddle, circle]]
        //add, update, and delete rectangles over time
        this.addRectanlgesInterval = setInterval(() => this.addRectangle(engine), 1000)
        this.updateInterval = setInterval(() => this.update(circle, paddle, paddleCircle, engine), 33.3)
        this.deleteRectanglesInterval = setInterval(this.deleteRectangles, .3)
        console.log(this.state.render.canvas)

    }
    //end of onMount
    componentWillUnmount() {
        clearInterval()
    }
    //update function, called each 33.3 milliseconds
    update = (circle, paddle, paddleCircle, engine) => {
        if (this.props.face === true) {
            this.setRotation(paddle, this.props.angle)
            if (this.props.mouth >= 10) {
                this.lerpPosition(paddle, paddle.position.x, 400, .08)

            } else {
                this.lerpPosition(paddle, paddle.position.x, 500, .08)
            }
            for (const rect of this.state.rectangles) {
                Body.setPosition(rect, { x: rect.position.x, y: (rect.position.y) + 5 })
                if (this.isTouchingBottom(circle, rect, 25) && Detector.collisions(paddleCircle, engine)[0].collided) {
                    //change game state in game container

                    //clear game loop and other loops
                    clearInterval(this.updateInterval)
                    clearInterval(this.deleteRectanglesInterval)
                    clearInterval(this.addRectanglesInterval)
       
                    //clear matter.js and its canvas
                    World.clear(engine.world)
                    Engine.clear(engine)
                    Render.stop(this.state.render)
                    this.setState({ rectangles: [] })
                    this.state.render.canvas.remove()
                    this.state.render.canvas = null
                    this.state.render.context=null
                    this.render.textures={}
                    Engine.run(engine)
                    this.props.stopGame()

                }
            }
        }
    }
    
    paddlePosition = (e) => {
        console.log("EE")
        if (e.keyCode === 68) {
            Body.rotate(this.state.paddle, .01)
        } else if (e.keyCode = 65) {
            Body.rotate(this.state.paddle, -.01)
        }
    }

    //add obstacle
    addRectangle = (engine) => {
        let platform = Bodies.rectangle(this.getRandomInt(80, 740), -200, 100, 40, { isStatic: true });
        this.state.rectangles.push(platform)
        World.add(engine.world, platform)
    }

    deleteRectangles = () => {
        for (let i = 0; i < this.state.rectangles.length; i++) {
            if (this.state.rectangles[i].position.y > 620) {
                this.state.rectangles.splice(i, 1)
            }
        }
    }
    //get random integer
    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    //lerpp
    lerp = (start, end, amount) => {
        return (1 - amount) * start + amount * end
    }

    //transformation functions

    //lerp position between two points
    lerpPosition = (body, targetX, targetY, amount) => {
        let x = this.lerp(body.position.x, targetX, amount)
        let y = this.lerp(body.position.y, targetY, amount)
        //Body.setPosition(rect, {x:rect.position.x, y: (rect.position.y)+.3})
        Body.setPosition(body, { x: x, y: y })

    }
    lerpRotation = (body, target, amount) => {
        let angle = this.lerp(body.angle, target, amount)
        Body.setAngle(body, angle)
    }

    setRotation = (body, angle) => {
        let constrainAngle = this.constrain(angle, -50, 50)
        let radians = this.convertDegreesToRadians(this.mapRange(angle, 1))
        Body.setAngle(body, radians)
    }

    //collision detection with bottom of platform
    //platform dimensions are
    isTouchingBottom = (circle, rectangle, radius) => {
        let cx = circle.position.x
        let cy = circle.position.y
        let rx = rectangle.vertices[0].x
        let ry = rectangle.vertices[0].y
        let rHeight = this.calcRectangleHeight(rectangle)
        let rWidth = this.calcRectangleWidth(rectangle)
        let testX = cx
        //always checking against bottom edge
        let testY = ry + rHeight
        //set left or right depending on location
        testX = this.setTest(testX, cx, rx, rWidth)
        //calc distance between edges and circle
        let distance = this.calcDistance(testX, testY, cx, cy)
        if (distance <= radius) {
            return true
        }
        return false
    }
    //calculation functions`
    setTest = (test, c, r, w) => {
        if (c < r) {
            return r
        } else if (c > r + w) {
            return r + w
        }
        return test
    }
    calcDistance = (x1, y1, x2, y2) => {
        let distX = x1 - x2
        let distY = y1 - y2
        return Math.sqrt((distX * distX) + (distY * distY))
    }
    calcRectangleHeight = (rectangle) => {
        return rectangle.vertices[2].y - rectangle.vertices[0].y
    }
    calcRectangleWidth = (rectangle) => {
        return rectangle.vertices[2].x - rectangle.vertices[0].x
    }
    convertDegreesToRadians = (degrees) => {
        return degrees * (pi / 180)
    }
    convertRadiansToDegrees = (radians) => {
        return radians * (180 / pi)
    }

    mapRange = (value, scaleFactor) => {
        if (value >= 0) {
            return scaleFactor * (90 - value)
        } else {
            return -1 * scaleFactor * (90 + value)
        }
    }
    constrain = (value, min, max) => {
        if (value > max) {
            return max
        } else if (value < min) {
            return min
        }
    }
    render() {
        return <div ref="scene" />
    }
}
export default Scene

