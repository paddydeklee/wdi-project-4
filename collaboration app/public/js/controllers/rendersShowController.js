angular
  .module('collaborator')
  .controller('rendersShowController', RendersShowController);

RendersShowController.$inject = ['Project', '$stateParams'];
function RendersShowController(Project, $stateParams){
  var vm = this;

// The entire 3D functionality is inside this function to allow the file to be looked up from AWS (the data)
  Project.get({id: $stateParams.project_id }).$promise.then(function(data){
    vm.project = data.project;
    vm.file    = data.project.files[$stateParams.id];
    console.log(vm.file);
  });

// // **********GECKOEXAMPLE**********
  // Set up the scene, camera, and renderer as global variables.
  var scene, camera, renderer;
  // Insert missing vars from Rays eg
    // scene, camera, renderer matched
  var container, stats;
  var particleMaterial;
  var raycaster;
  var mouse;
  var objects = [];
  var intersections =[];

  init();
  animate();

  // Sets up the scene.
  function init() {

    // Create the scene and set the scene size.
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer({antialias:true,  alpha: true });

    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    // Create a camera, zoom it out from the model a bit, and add it to the scene.
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(0,6,0);
    scene.add(camera);

    // Create an event listener that resizes the renderer with the browser window.
    window.addEventListener('resize', function() {
      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    });

    // Create a light, set its position, and add it to the scene.
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    scene.add(light);

    // Load in the mesh and add it to the scene.
    var loader = new THREE.JSONLoader();
    loader.load( "/3Dmodels/treehouse_logo.js", function(geometry){
      var material = new THREE.MeshLambertMaterial({color: 0x55B663});
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      objects.push(mesh);
      console.log(objects);
    });

    // new raycaster to be activated on mouse click
    raycaster = new THREE.Raycaster();
    console.log("Raycaster loaded", raycaster);

    // vector to be drawn from the mouse normal
    mouse = new THREE.Vector2();
    console.log("mouse loaded", mouse);

    renderer.setPixelRatio(window.devicePixelRatio);

    //EVENT HANDLING
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    window.addEventListener('resize', onWindowResize, false);

    // SIZE CONTROL
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function onDocumentTouchStart( event ) {
      event.preventDefault();
      event.clientX = event.touches[0].clientX;
      event.clientY = event.touches[0].clientY;
      onDocumentMouseDown( event );
    }

    function onDocumentMouseDown( event ) {
      console.log("hello");
      event.preventDefault();
      mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

      // raycaster is set as the normal of the mouse, through the camera's normal
      raycaster.setFromCamera( mouse, camera );

      var latestSprite = 3;
      // finds the intersects between the raycaster and the intersected object
      var intersects = raycaster.intersectObjects( objects );
      if ( intersects.length > 0 ) {
        intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
        console.log(intersects[0].object);

        var particle = new THREE.Sprite( particleMaterial );
        particle.material.color = new THREE.Color(0x0066CC);
        particle.position.copy( intersects[ 0 ].point );
        console.log(particle.position);
        particle.scale.x = particle.scale.y = particle.scale.z = 0.2;
        scene.add( particle );

        // scene.children[latestSprite].push("Private Ryan");
        latestSprite++;
        console.log(latestSprite);
        console.log(scene.children);

      }
    }

    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);
  }

  // Renders the scene and updates the render as needed.
  function animate() {

    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);

    // Render the scene.
    renderer.render(scene, camera);
    controls.update();
  }
}
