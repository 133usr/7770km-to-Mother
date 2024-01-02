

import { AnimationPlayer, AnimationSet, AnimationParser, LOOP_TYPE } from './cesium_model_animation_player.js';
// // The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = '/';
import * as Cesium from 'cesium';

import "cesium/Build/Cesium/Widgets/widgets.css";

import '../src/style.css'

import TWEEN from '@tweenjs/tween.js'

import GUI from 'lil-gui';


import scoreData from './scoredata.json';
import Hammer from 'hammerjs'; 
// Use scoreData in your code

function showSpinner() {
  document.querySelector('.spinner-container').style.display = 'flex';
}

// Function to hide the spinner
function hideSpinner() {
  document.getElementById('spinner').style.display = 'none';
  
}
/**************************************************************
 *                                                           *
 *                   MAIN FUNCTION                            *
 *                                                           *
 **************************************************************/
/**************************************************************
 *                                                           *
 *      tempsheetObject can be available throught sheet       *
 *          all you need to do is to iterate it 
 *                                                            *
 **************************************************************/


    async function main() {
      
        let allData = await fetchData();
              
        allData = allData.replace(/[""]+/g,'"'); //dont' know why data has extra ""  so remove them
        allData = allData.replace('"[{','[{'); //dont' know why data has extra ["  so remove them
        allData = allData.replace('}]"','}]');     
        // console.log(allData);  
        var sheet_arrayObject = JSON.parse(allData);  
        var participants = Object.keys(sheet_arrayObject).length;
        
        // console.log(s);
      

        function onComplete(sheet_arrayObject){ // When the code completes, do this
                const forLoop = async _ => {
                console.log("Start");
                  
                  
                 for (let index = 0; index < participants; index++) {
                  var tempsheetObject = sheet_arrayObject[index]
                  let groupType = sheet_arrayObject[index].group;
                  
                  if (groupType != "Group")
                 
               
                   { if(tempsheetObject.Total>0) // only load model and list the names ******* if the score is not 0
                   { 
                    loadModels(tempsheetObject);
                  }
                  }
                  
                   if (groupType == "Group")
                   {//only run for Group score
                      // await myPromise2(tempsheetObject);  //****************very important Uncomment this to run */
                    }
                  
                  }
                  
                 console.log("End");
                 
                 };
                 forLoop();
    }
    





        //   migrate from dat ui to https://lil-gui.georgealways.com/#Guide#Installation
        const gui = new GUI({
          closeFolders : true,
          autoPlace: true, //autoPlace - Adds the GUI to document.body and fixes it to the top right of the page.
          title: 'Participants',
          

        }); 
        

        var a_br_folder = gui.addFolder('विवाहित भाई');
        var a_sis_folder = gui.addFolder('विवाहित बहन');
        var y_br_folder = gui.addFolder('युवा और छात्र भाई');
        var y_sis_folder = gui.addFolder('युवा और छात्र बहन');
        var pandesra_group = gui.addFolder('पांडेसरा');
       

        var a_br_folder_group1 = a_br_folder.addFolder('इसहाक');
        var a_br_folder_group2 = a_br_folder.addFolder('इम्मानुएल');
        var a_sis_folder_group1 = a_sis_folder.addFolder('रूत');
        var a_sis_folder_group2 = a_sis_folder.addFolder('सराह');
        var a_sis_folder_group3 = a_sis_folder.addFolder('एस्तेर');
        //   var y_br_folder_group2 = a_br_folder.addFolder('Group2');

        const scoreBoard = {
            
          स्कोरबोर्ड: function() { window.location.href = './scoreboard_code/score_board.html' }
        }
            gui.add(scoreBoard,'स्कोरबोर्ड');










            // const flightData = JSON.parse(
            //   '[{"longitude":-122.39053,"latitude":37.61779,"height":-27.32},{"longitude":-122.39035,"latitude":37.61803,"height":-27.32},{"longitude":-122.39019,"latitude":37.61826,"height":-27.32},{"longitude":-122.39006,"latitude":37.6185,"height":-27.32},{"longitude":-122.38985,"latitude":37.61864,"height":-27.32},{"longitude":-122.39005,"latitude":37.61874,"height":-27.32},{"longitude":-122.39027,"latitude":37.61884,"height":-27.32},{"longitude":-122.39057,"latitude":37.61898,"height":-27.32},{"longitude":-122.39091,"latitude":37.61912,"height":-27.32},{"longitude":-122.39053,"latitude":37.61779,"height":-27.32}]');


        let airplaneEntity;
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MjAyYjg4NC02NzM0LTQxOGMtOGNhOC0wZDYxN2Q4ZTA2YmEiLCJpZCI6MTgzODk5LCJpYXQiOjE3MDIzNTg1ODd9.ti2Hyf1LxJL3UPbXCUwuIz8So9DCU3Uwovqm-FN0gxI';
        const  viewer = new Cesium.Viewer('cesiumContainer', 
        {
         
        
          animation: false,
          shouldAnimate: true, // Ensure animation is enabled
          baseLayerPicker: false,
          fullscreenButton: false,
          geocoder: false,
          homeButton: false,
          infoBox: false,
          sceneModePicker: false,
          
          // timeline: false
          });
          viewer.scene.setTerrain(
            new Cesium.Terrain(Cesium.CesiumTerrainProvider.fromIonAssetId(1))
          );
          viewer.scene.globe.terrainExaggeration = 9.0;
          viewer.scene.globe.enableLighting = true;
          
                    
        let isLayerVisible = false;
        let baseLayer;

        const layerCheckbox = gui.add({ visibility: isLayerVisible }, 'visibility').name('नक्शे का नाम');
        function toggleBaseLayerVisibility() {
          document.querySelectorAll(".title")[0].click()  // toggle the lil-gui on every click
            if (!baseLayer) {
                // Create the Cesium Imagery Layer for the base layer
                baseLayer = 
                    Cesium.ImageryLayer.fromWorldImagery({
                        style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
                    });
                    viewer.imageryLayers.add(baseLayer);
            }
            isLayerVisible = !isLayerVisible;
            if (baseLayer) {
                baseLayer.show = isLayerVisible;
            }
        }
        layerCheckbox.onChange(toggleBaseLayerVisibility);
        

        // Set the camera view to focus on India
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(78.9629, 20.5937, 2000000.0), // Coordinates for India (longitude, latitude)
          orientation: {
              heading: Cesium.Math.toRadians(0.0), // Set desired heading in radians
              pitch: Cesium.Math.toRadians(-90.0), // Set desired pitch in radians
              roll: 0.0 // Set desired roll in radians
          },
          duration: 3 // Set the duration of the flight animation in seconds
        });


        function hideCesiuminfo(){
          //hide the unwanted additional layers here
          document.querySelector(".cesium-timeline-bar").remove()
          document.querySelector(".cesium-viewer-bottom").remove()
          document.querySelector(".cesium-viewer-timelineContainer").remove()
          


        }
        hideCesiuminfo();


let path = loadSkyBox_bytime();

const skyboxPaths = {
  positiveX: './models/skybox/'+path+'/pos_x.png',
  negativeX: './models/skybox/'+path+'/neg_x.png',
  positiveY: './models/skybox/'+path+'/pos_y.png',
  negativeY: './models/skybox/'+path+'/neg_y.png',
  positiveZ: './models/skybox/'+path+'/pos_z.png',
  negativeZ: './models/skybox/'+path+'/neg_z.png'
};

        viewer.scene.skyBox = new Cesium.SkyBox({
          sources: skyboxPaths
      });

      let rotationAngle = 0; // Initial rotation angle

      function rotateGlobe() {
          rotationAngle += Cesium.Math.toRadians(0.1); // Adjust the rotation speed by changing the angle increment
      
          // Get the current globe transform
          const transform = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(0, 0));
      
          // Create a rotation matrix using the current angle around the Z-axis
          const rotation = Cesium.Matrix3.fromRotationZ(rotationAngle);
      
          // Apply the rotation to the transform matrix
          const rotatedTransform = Cesium.Matrix3.multiply(rotation, transform, new Cesium.Matrix3());
      
          // Set the globe's new orientation
          viewer.scene.globe.orientTransform = rotatedTransform;
      
          // Request animation frame for smooth rotation
          requestAnimationFrame(rotateGlobe);
      }
      
      // Start the rotation effect
      rotateGlobe();
      


        const loadedModels = {};
        
              const loadModels = async (tempsheetObject) => {
                  
                  const objectFilename = './models/glb/low-size/cartoon_Plane_pink.glb';
                  var age_group = tempsheetObject.group;
                  let modelId_asset = choose_model_assetID(age_group);

                  const label_style = color_style_box(tempsheetObject);
                  const resource = await Cesium.IonResource.fromAssetId(modelId_asset);
                    const loadModel = async () => {
                      // positionProperty =  ;
                      let airplaneEntity = viewer.entities.add({
                      
                        model: {
                          uri: resource,
                          scale: 40,
                          minimumPixelSize: 32,
                        },
                        label: label_style
                      });
                  
                      var id = tempsheetObject.Id;
                      //let's calculate height by age group
                      let height_by_group = calculate_height_by_group(tempsheetObject.group,tempsheetObject.Total);
                      //animate the model
                      animateModel(airplaneEntity,tempsheetObject.Total,height_by_group)
                      .then(() => {
                        // Code to execute after the animation has completed
                        console.log('Animation completed!');
                        upDownYOYO(airplaneEntity);
                      })
                      .catch((error) => {
                        // Handle any errors during animation
                        console.error('Animation error:', error);
                      });
                    // Assign an ID to the loaded model entity
                    loadedModels[id] = airplaneEntity;
                
                      // Fetch and parse animation data
                      // const response = await fetch(resource);
                      // const blob = await response.blob();
                      // const animationSet = await AnimationParser.parseAnimationSetFromFile(blob);
                      // const animationPlayer = new AnimationPlayer(animationSet, airplaneEntity, 30);
                      // animationPlayer.loop_type = LOOP_TYPE.LOOP;
                      // animationPlayer.play();
                      // animationPlayer.speed = 2.0;
                    };
                                                  
                                                      
                    // Load the model
                  await loadModel();
                 
                  var name_participant = tempsheetObject.Participant;
                  
      
                  
                  const camerOnClick = {
                    [name_participant]: function () {
                      const entity = loadedModels[tempsheetObject.Id];
                     
                      if (entity) {
                        scoreBox_CSS(tempsheetObject);
                        document.querySelectorAll(".title")[0].click()  // toggle the lil-gui
                        viewer.trackedEntity = undefined;
                        flyToModel(entity).then(() => {// using promise to call this function twice by itself 
                          flyToModel(entity).then(() => {// using promise to call this function twice by itself 
                            viewer.trackedEntity = entity;
                          }).catch((error) => {console.error('Error:', error.message);});
                        }).catch((error) => {console.error('Error:', error.message);});
                        console.log(`Camera focused on model with ID: ${tempsheetObject.Id}`);
                      } else {
                        console.log(`Model with ID ${tempsheetObject.Id} not found.`);
                      }
                    }
                  };


                  // Add the camerOnClick function to a_br_folder_group1 in the GUI
                  if (age_group === 'Isaac') {
                    a_br_folder_group1.add(camerOnClick, name_participant);
                    console.log(age_group);
                  }
                  else if(age_group==='Immanuel')
                  a_br_folder_group2.add(camerOnClick, name_participant );

                  else if(age_group==='Ruth')
                  a_sis_folder_group1.add(camerOnClick, name_participant);

                  else if(age_group==='Sarah')
                  a_sis_folder_group2.add(camerOnClick, name_participant);

                  else if(age_group==='Esther')
                  a_sis_folder_group3.add(camerOnClick, name_participant);

                  else if(age_group==='Y & St. Brother')
                  y_br_folder.add(camerOnClick, name_participant);
                  
                  else if(age_group==='Y & St. Sister')
                  y_sis_folder.add(camerOnClick, name_participant);

                  else if(age_group==='Pandesra')
                  pandesra_group.add(camerOnClick, name_participant);
                  
                
              };
            

    onComplete(sheet_arrayObject);

     // Event listener to handle the click event on the model
     viewer.selectedEntityChanged.addEventListener(function () {
      const selectedEntity = viewer.selectedEntity;
      if (selectedEntity) {
        console.log(" "+selectedEntity.id);
      }
    });





function flyToModel(entity) {
  return new Promise((resolve, reject) => {
    const modelPosition = entity.position.getValue(Cesium.JulianDate.now()); // Get the position of the model
   
    if (Cesium.defined(modelPosition)) {
      const flightDuration = 3.0; // Duration of the flight animation in seconds

      // Get the current camera position and orientation
      const startPosition = viewer.camera.positionWC.clone();
      const startOrientation = viewer.camera.directionWC.clone();

      // Calculate the end position of the camera focusing on the model
      const endPosition = Cesium.Cartesian3.add(modelPosition, new Cesium.Cartesian3(0, 0, 500), new Cesium.Cartesian3()); // Adjust the height as needed
      const endOrientation = Cesium.Cartesian3.subtract(modelPosition, startPosition, new Cesium.Cartesian3());
      Cesium.Cartesian3.normalize(endOrientation, endOrientation);

      // Start the camera flight animation
      viewer.camera.flyTo({
        destination: endPosition,
        orientation: {
          direction: endOrientation,
          up: viewer.camera.up,
          roll: 0,
          pitch: 0,
        },
        duration: flightDuration,
        complete: function () {
          // Optionally, you can perform actions once the flight animation is complete
          console.log('Camera flight animation complete!');
       
          resolve(); // Resolve the promise when animation is complete
        },
      });
    } else {
      reject(new Error('Model position is not defined'));
    }
  });
}






// Function to animate the model along flight data using Tween.js
function animateModel(modelEntity,totalScoreOfModel,height_by_group) {
  return new Promise((resolve, reject) => {
  let currentIndex = 0;
  const duration = 10000; // Assuming a fixed duration of 2000 milliseconds for each transition
  let flightData_of_thisModel = [];
  let totalScore_minus_5=5;
  if(totalScoreOfModel<5) {
        totalScore_minus_5 = 1;
        }else{
          totalScore_minus_5=totalScoreOfModel-5;
        }
        if(totalScoreOfModel<2)
          totalScoreOfModel = 2;

  flightData_of_thisModel = generateFlightData(totalScore_minus_5,totalScoreOfModel);
  function tweenNext() {
    if (currentIndex < flightData_of_thisModel.length - 1) {
      const startPosition = Cesium.Cartesian3.fromDegrees(flightData_of_thisModel[currentIndex].longitude, flightData_of_thisModel[currentIndex].latitude, height_by_group);
      const endPosition = Cesium.Cartesian3.fromDegrees(flightData_of_thisModel[currentIndex + 1].longitude, flightData_of_thisModel[currentIndex + 1].latitude, height_by_group);

      if(isNaN(flightData_of_thisModel[currentIndex].longitude)||isNaN(flightData_of_thisModel[currentIndex].latitude))
      console.log("true nan");

      // Calculate the direction vector from start to end position
      const direction = Cesium.Cartesian3.subtract(endPosition, startPosition, new Cesium.Cartesian3());
      
      if(direction.x !=0)
      Cesium.Cartesian3.normalize(direction, direction);
      else
      console.log(direction+'  '+currentIndex);

      new TWEEN.Tween({ x: startPosition.x, y: startPosition.y, z: startPosition.z })
        .to({
          x: endPosition.x,
          y: endPosition.y,
          z: endPosition.z
        }, duration)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function(obj) {
          modelEntity.position = new Cesium.Cartesian3(obj.x, obj.y, obj.z); // Update the model's position

          // Calculate the orientation based on the direction of movement using VelocityOrientationProperty
          const velocityOrientation = new Cesium.VelocityOrientationProperty(new Cesium.SampledPositionProperty());
          velocityOrientation.position.addSample(Cesium.JulianDate.now(), startPosition);
          velocityOrientation.position.addSample(Cesium.JulianDate.addSeconds(Cesium.JulianDate.now(), 1.0, new Cesium.JulianDate()), endPosition);
          // Set interpolation options for smoother transitions
          
          modelEntity.orientation = velocityOrientation.getValue(Cesium.JulianDate.now());
        })
        .onComplete(() => {
          currentIndex++;
          tweenNext(); // Continue to the next point
          // upDownYOYO(modelEntity);
        })
        .start();
    }else{
      // upDownYOYO(modelEntity);
      resolve();
    }
  }

  // Start animation
  tweenNext();
});
}


function calculate_height_by_group(ageGroup,totalScore){

          let minim,max;
          
          totalScore = parseFloat(totalScore);
          if (ageGroup === 'Isaac') 
              { minim = 130; max = 140;}
          else if(ageGroup==='Immanuel')
              { minim = 130; max = 140;}

          else if(ageGroup==='Ruth')
              { minim = 90; max = 100;}

          else if(ageGroup==='Sarah')
              { minim = 80; max = 90;}

          else if(ageGroup==='Esther')
              { minim = 70; max = 80;}

          else if(ageGroup==='Y & St. Brother')
              { minim = 130; max = 140;}
          
          else if(ageGroup==='Y & St. Sister')
              { minim = 30; max = 20;}

          else if(ageGroup==='Pandesra')
              { minim = 80; max =70;}

              minim = parseFloat(minim);
              max = parseFloat(max);
              minim = totalScore * minim;
              max =  totalScore * max;  
  return Math.floor(Math.random() * (max - minim + 1)) + minim;
}


// up and donw for animation
function upDownYOYO(modelEntity) {
  var startPosition = modelEntity.position.getValue(Cesium.JulianDate.now());
  var endPosition = Cesium.Cartesian3.add(startPosition, new Cesium.Cartesian3(10, 20, 20), new Cesium.Cartesian3()); // Move up by 100 units
  let randomTime = (Math.random() * (13000 - 8000)) + 8000; // add some rand time
  // Use Tween.js to animate the position
  new TWEEN.Tween(startPosition)
      .to(endPosition, randomTime) // Animation duration: 2000 milliseconds
      .easing(TWEEN.Easing.Quadratic.InOut) // Use a specific easing function if needed
      .onUpdate(function() {
          modelEntity.position.setValue(startPosition);
      })
      .repeat(Infinity) // Repeat the animation indefinitely
      .yoyo(true) // Alternate between the start and end positions
      .start();
}



 // Update Tween.js
 function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
}
animate();

    







//lets get the scoreboard data


// Function to generate flightData based on a specific range (1 to 5 in this case)
function generateFlightData(startIndex, endIndex) {
  const flightData5 = [];
  let rand_lat = (Math.random() * (0.0050 - 0.0010)) + 0.0100; // add some random lat and longs
  let rand_long = (Math.random() * (0.0050 - 0.0010)) + 0.0100;
  rand_lat   =  parseFloat(rand_lat.toFixed(4));
  rand_long  =  parseFloat(rand_long.toFixed(4))

  for (let i = startIndex; i <= endIndex; i++) {
    if (scoreData["SCOREbyLOCATION"][i]) {
      flightData5.push({
        latitude: scoreData["SCOREbyLOCATION"][i].latitude + rand_lat,
        longitude: scoreData["SCOREbyLOCATION"][i].longitude + rand_long
      });
    }
  }
  return flightData5;
}








function scoreBox_CSS (tempsheetObject){ // NOT USING X AND Y
            
  var parti_name  = tempsheetObject.Participant;
  var preach      = (tempsheetObject.totalPreach).toFixed(2);
  var m_Preach    = (tempsheetObject.totalApp_visit).toFixed(2);
  var fruits       = (tempsheetObject.totalFruits).toFixed(2);
  var total_score = (tempsheetObject.Total).toFixed(2);
  var elohim_aca  = (tempsheetObject.totalSign+tempsheetObject.chap_complete).toFixed(2);

  var text2 = document.createElement('container');
  text2.style.position = 'absolute';
  text2.classList.add('animated-border-box-glow');
  text2.classList.add('animated-border-box');
  text2.classList.add('center-box');
 
  // text2.style.height = 100;
  // text2.style.backgroundColor = "blue";
  text2.innerHTML = "<p class='titles' > नाम: <f class='score' style = 'alight-right:100%'>"+parti_name+"</f></p>";
  text2.innerHTML += "<p class='titles' > सा.प्रचार: <f class='score' style = 'alight-right:100%'>"+preach+"km</f></p>";
  text2.innerHTML += "<p class='titles' > अप्पोइ&विजि: <f class='score' style = 'alight-right:100%'>"+m_Preach+"km</f></p>";
  text2.innerHTML += "<p class='titles' > फल: <f class='score' style = 'alight-right:100%'>"+fruits+"km</f></p>";
  text2.innerHTML += "<p class='titles' > एलोहिम अका.: <f class='score' style = 'alight-right:100%'>"+elohim_aca+"km</f></p>";
  text2.innerHTML += "<p class='titles' > Total Score: <f class='score' style = 'alight-right:100%'>"+total_score+"km</f></p>";
  
  text2.style.bottom = 0 + 'px';
  // text2.style.center = 0 + 'px';
  document.body.appendChild(text2);
  $("container").click(function(){
      //clicked on the box
       //remove box
       var container = document.querySelectorAll("container")[0];
       if(container != null)
          {
          document.querySelectorAll("container")[0].remove();
          document.querySelectorAll(".title")[0].click()  // toggle the lil-gui
          }
   
      });
      var cesiumContainer = document.getElementById("cesiumContainer");
      cesiumContainer.addEventListener('click', function(event) {
        var container = document.querySelectorAll("container")[0];
        if(container != null)
           {
           document.querySelectorAll("container")[0].remove();
         
           }
       
    });
     
}






function color_style_box(tempsheetObject){
  var age_group = tempsheetObject.group;
  let color_scheme ={};
  switch (true) {
    case age_group.includes('Isaac'):
          color_scheme = {
            text: tempsheetObject.Participant + '\n' + tempsheetObject.Total + 'Km', // Text with multiple lines
            font: 'italic bold 16px Georgia', // Italic, bold, and larger font with a serif typeface
            fillColor: Cesium.Color.fromBytes(128, 128, 0), // Olive green text color
            outlineColor: Cesium.Color.WHITE, // White outline color
            outlineWidth: 2, // Moderate outline width
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -50),
            showBackground: true,
            backgroundColor: Cesium.Color.fromBytes(240, 240, 240).withAlpha(0.7), // Light grayish background color with some transparency
            backgroundPadding: new Cesium.Cartesian2(15, 12), // Padding around the text inside the background
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 50000.0),
          };               
      break;
    
    case age_group.includes('Immanuel'):
          color_scheme = {
            text: tempsheetObject.Participant + '\n' + tempsheetObject.Total + 'Km', // Text with multiple lines
            font: 'italic bold 16px Georgia', // Italic, bold, and larger font with a serif typeface
            fillColor: Cesium.Color.fromBytes(0, 0, 128), // Navy blue text color
            outlineColor: Cesium.Color.WHITE, // White outline color
            outlineWidth: 2, // Moderate outline width
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -50),
            showBackground: true,
            backgroundColor: Cesium.Color.fromBytes(240, 240, 240).withAlpha(0.7), // Light grayish background color with some transparency
            backgroundPadding: new Cesium.Cartesian2(15, 12), // Padding around the text inside the background
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 50000.0),
          };              
    break;

    case age_group.includes('Ruth'):
          color_scheme = {
            text: tempsheetObject.Participant + '\n' + tempsheetObject.Total + 'Km', // Text with multiple lines
            font: 'italic bold 16px Georgia', // Italic, bold, and larger font with a serif typeface
            fillColor: Cesium.Color.fromBytes(64, 79, 107), // Dark blue text color
            outlineColor: Cesium.Color.WHITE, // White outline color
            outlineWidth: 2, // Moderate outline width
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -50),
            showBackground: true,
            backgroundColor: Cesium.Color.fromBytes(240, 240, 240).withAlpha(0.7), // Light grayish background color with some transparency
            backgroundPadding: new Cesium.Cartesian2(15, 12), // Padding around the text inside the background
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 50000.0),
          };                      
      break;
    
    case age_group.includes('Sarah'):
         color_scheme = {
          text: tempsheetObject.Participant + '\n' + tempsheetObject.Total + 'Km', // Text with multiple lines
          font: 'italic bold 16px Georgia', // Italic, bold, and larger font with a serif typeface
          fillColor: Cesium.Color.fromBytes(139, 0, 0), // Deep red text color
          outlineColor: Cesium.Color.WHITE, // White outline color
          outlineWidth: 2, // Moderate outline width
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          pixelOffset: new Cesium.Cartesian2(0, -50),
          showBackground: true,
          backgroundColor: Cesium.Color.fromBytes(240, 240, 240).withAlpha(0.7), // Light grayish background color with some transparency
          backgroundPadding: new Cesium.Cartesian2(15, 12), // Padding around the text inside the background
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 50000.0),
        };  
    break;
    
    case age_group.includes('Esther'):
          color_scheme = {
            text: tempsheetObject.Participant + '\n' + tempsheetObject.Total + 'Km', // Text with multiple lines
            font: 'italic bold 16px Georgia', // Italic, bold, and larger font with a serif typeface
            fillColor: Cesium.Color.fromBytes(0, 128, 128), // Dark teal text color
            outlineColor: Cesium.Color.WHITE, // White outline color
            outlineWidth: 2, // Moderate outline width
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -50),
            showBackground: true,
            backgroundColor: Cesium.Color.fromBytes(240, 240, 240).withAlpha(0.7), // Light grayish background color with some transparency
            backgroundPadding: new Cesium.Cartesian2(15, 12), // Padding around the text inside the background
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 50000.0),
          };                   
      break;
    
    case age_group.includes('Y & St. Brother'):
          color_scheme = {
            text: tempsheetObject.Participant + '\n' + tempsheetObject.Total + 'Km', // Text with multiple lines
            font: 'italic bold 16px Georgia', // Italic, bold, and larger font with a serif typeface
            fillColor: Cesium.Color.fromBytes(64, 79, 107), // Dark blue text color
            outlineColor: Cesium.Color.WHITE, // White outline color
            outlineWidth: 2, // Moderate outline width
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -50),
            showBackground: true,
            backgroundColor: Cesium.Color.fromBytes(240, 240, 240).withAlpha(0.7), // Light grayish background color with some transparency
            backgroundPadding: new Cesium.Cartesian2(15, 12), // Padding around the text inside the background
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 50000.0),
          };                         
    break;

    case age_group.includes('Y & St. Sister'):
          color_scheme = {
            text: tempsheetObject.Participant + '\n' + tempsheetObject.Total + 'Km', // Text with multiple lines
            font: 'italic bold 16px Georgia', // Italic, bold, and larger font with a serif typeface
            fillColor: Cesium.Color.fromBytes(128, 0, 128), // Dark purple text color
            outlineColor: Cesium.Color.WHITE, // White outline color
            outlineWidth: 2, // Moderate outline width
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -50),
            showBackground: true,
            backgroundColor: Cesium.Color.fromBytes(240, 240, 240).withAlpha(0.7), // Light grayish background color with some transparency
            backgroundPadding: new Cesium.Cartesian2(15, 12), // Padding around the text inside the background
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 50000.0),
          };              
      break;
    
    case age_group.includes('Pandesra'):
          color_scheme = {
            text: tempsheetObject.Participant + '\n' + tempsheetObject.Total + 'Km', // Text with multiple lines
            font: 'italic bold 16px Georgia', // Italic, bold, and larger font with a serif typeface
            fillColor: Cesium.Color.fromBytes(64, 79, 107), // Dark blue text color
            outlineColor: Cesium.Color.WHITE, // White outline color
            outlineWidth: 2, // Moderate outline width
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -50),
            showBackground: true,
            backgroundColor: Cesium.Color.fromBytes(240, 240, 240).withAlpha(0.7), // Light grayish background color with some transparency
            backgroundPadding: new Cesium.Cartesian2(15, 12), // Padding around the text inside the background
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 50000.0),
          };              
    break;
  
    default:
          color_scheme = {
            text: tempsheetObject.Participant + '\n' + tempsheetObject.Total + 'Km', // Text with multiple lines
            font: 'italic bold 16px Georgia', // Italic, bold, and larger font with a serif typeface
            fillColor: Cesium.Color.fromBytes(64, 79, 107), // Dark blue text color
            outlineColor: Cesium.Color.WHITE, // White outline color
            outlineWidth: 2, // Moderate outline width
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -50),
            showBackground: true,
            backgroundColor: Cesium.Color.fromBytes(240, 240, 240).withAlpha(0.7), // Light grayish background color with some transparency
            backgroundPadding: new Cesium.Cartesian2(15, 12), // Padding around the text inside the background
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 50000.0),
          };              
      break;
  }
  return color_scheme;
}
function choose_model_assetID (ageGrp)
{
          switch (true) {
            case ageGrp.includes('Isaac'):
                  return '2408884';  
             
            case ageGrp.includes('Immanuel'):
                 return '2408884';  
            
            case ageGrp.includes('Ruth'):
                 return '2408886';  
              
            case ageGrp.includes('Sarah'):
                return '2408886';  
            
            case ageGrp.includes('Esther'):
                return '2408886';  
              
            case ageGrp.includes('Y & St. Brother'):
                return '2408887';  

            case ageGrp.includes('Y & St. Sister'):
                return '2408885';  

            case ageGrp.includes('Pandesra'):
                return '2408887';  

            default:
             return '2408887';  
              
          }
}













// Create an instance of Hammer and pass the Cesium viewer's container element
const hammerHandler = new Hammer(viewer.canvas);

// Function to handle double tap (double click) event
function handleDoubleTap(event) {
    // Check if it's a double tap event
    if (event.tapCount === 2) {
        // Handle the double tap action here
        console.log('Double tap detected!');
        viewer.trackedEntity = undefined;
    }
}

// Add an event listener for double tap
hammerHandler.on('doubletap', handleDoubleTap);

    /**************************************************************
     *                                                           *
     *                   MAIN FUNCTION  ENDS NOW                 *
     *                                                           *
     **************************************************************/

    hideSpinner(); //laoding complete    
}



  
/**SET THE BACK GROUND   THAT IS THE SKYBOX */
// change backgroundColor by time
function loadSkyBox_bytime(){
        const now = new Date();
        const currentHour = now.getHours();
        // Get the current day of the month (1-31)
        const currentDay = now.getDate();

        if(currentDay>=1 && currentDay <= 5){
          if(currentHour<=18 && currentHour >= 6)
          {
            return 'day1'
          }
          else return 'night1'
        }
        else if(currentDay>=6 && currentDay <= 10){
          if(currentHour<=18 && currentHour >= 6)
          {
            return 'day4'
          }
          else return 'night2'
        }
        else if(currentDay>=11 && currentDay <= 15){
          if(currentHour<=18 && currentHour >= 6)
          {
            return 'day3'
          }
          else return 'night3'
        }
        else if(currentDay>=16 && currentDay <= 20){
          if(currentHour<=18 && currentHour >= 6)
          {
            return 'day4'
          }
          else return 'night4'
        }
        else if(currentDay>=21 && currentDay <= 25){
          if(currentHour<=18 && currentHour >= 6)
          {
            return 'day1'
          }
          else return 'night3'
        }
        else if(currentDay>=26 && currentDay <= 31){
          if(currentHour<=18 && currentHour >= 6)
          {
            return 'day4'
          }
          else return 'night1'
        }
}






async function fetchData() {
  try {
    let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7Zx1Vnsdizp-ee3wroRGSME9hyu8bUvXWBQWiWf0zNWMJ7z5Wtj0lN52ibU_jg8PEsEWG53VFZ8ee/pub?gid=1246387545&single=true&output=csv&range=C3";
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const text = await response.text();
    return text; // This is the fetched data
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
 

//CALL MAIN
function startLoading() {
  showSpinner();
  main();
}
startLoading();

































// loadData();

// function loadData (){
//     let result; 
//     // ========================================================================================================================================================================================
 
//     let url ="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7Zx1Vnsdizp-ee3wroRGSME9hyu8bUvXWBQWiWf0zNWMJ7z5Wtj0lN52ibU_jg8PEsEWG53VFZ8ee/pub?gid=1246387545&single=true&output=csv&range=C3"          
//                   fetch(url) 
//                   .then(response => response.text())
//                   .then(text => { //what to do with result?
//                    result = text; 
//                    onComplete(result);
//                 }); 
//                 }

//   function getAllData(allData)
//         {   allData = allData.replace(/[""]+/g,'"'); //dont' know why data has extra ""  so remove them
//         allData = allData.replace('"[{','[{'); //dont' know why data has extra ["  so remove them
//         allData = allData.replace('}]"','}]'); 
        
//             var myobje = JSON.parse(allData);
//             console.log(myobje[1].Id);
//             // myobje.map(x => console.log(x.Id)); to loop it through                     
            
//         }    