song = "";
objects = [];
status = "";

function preload() {
    song = loadsound("alarm.mp3");
}

function setup() {
    canvas = createcanvas(380, 380);
    canvas.center();
    video = createcapture(video);
    video.size(380, 380);
    video.hide();
    objectdetector = ml5.objectdetector('cocossd', modelloaded);
    document.getelementbyid("status").innerhtml = "status : detecting objects";
}

function modelloaded() {
    console.log("model loaded!")
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectdetector.detect(video, gotresult);
        for (i = 0; i < objects.length; i++) {
            document.getelementbyid("status").innerhtml = "status : object detected";
            fill(color(r, g, b));
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            nofill();
            stroke(color(r, g, b));
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                document.getelementbyid("number_of_objects").innerhtml = "baby found";
                console.log("stop");
                song.stop();
            } else {
                document.getelementbyid("number_of_objects").innerhtml = "baby not found";
                console.log("play");
                song.play();
            }
        }
        if (objects.length == 0) {
            document.getelementbyid("number_of_objects").innerhtml = "baby not found";
            console.log("play");
            song.play();
        }
    }
}