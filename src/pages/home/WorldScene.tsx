import { useEffect, useRef } from "react";
import * as THREE from "three";

const cityData = [
  [-10, -5, 0xd9474f], [-5, -3, 0xd9474f], [1, 0, 0x269ad0],
  [8, -4, 0xd9474f], [-8, 4, 0xe6a62c], [7, 5, 0xd9474f],
] as const;

function material(color: number, roughness = .78) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 });
}

function addTree(scene: THREE.Scene, x: number, z: number, scale: number) {
  const tree = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.12, .17, .7, 7), material(0x6d4528));
  trunk.position.y = .35;
  const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(.65, 1), material(0x397d42));
  crown.scale.set(1, 1.25, 1);
  crown.position.y = 1.08;
  const highlight = new THREE.Mesh(new THREE.IcosahedronGeometry(.38, 1), material(0x65a64f));
  highlight.position.set(-.22, 1.35, -.12);
  tree.add(trunk, crown, highlight);
  tree.position.set(x, 0, z);
  tree.scale.setScalar(scale);
  tree.rotation.y = (x * 7 + z * 3) % Math.PI;
  scene.add(tree);
}

function addCastle(scene: THREE.Scene, x: number, z: number, roofColor: number, selected = false) {
  const castle = new THREE.Group();
  const stone = material(0xf0e2bd, .7);
  const shade = material(0xa9b7b5, .78);
  const trim = material(0xffffff, .6);
  const roof = material(roofColor, .5);
  const darkRoof = material(new THREE.Color(roofColor).multiplyScalar(.58).getHex(), .58);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.95, 2.12, .34, 20), material(0x769c4b));
  base.position.y = .17;
  castle.add(base);

  const courtyard = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.7, .16, 20), material(0xd8c995));
  courtyard.position.y = .39;
  castle.add(courtyard);

  const wall = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.62, .72, 20, 1, true), stone);
  wall.position.y = .78;
  castle.add(wall);
  const wallTrim = new THREE.Mesh(new THREE.TorusGeometry(1.57, .09, 6, 24), trim);
  wallTrim.rotation.x = Math.PI / 2;
  wallTrim.position.y = 1.13;
  castle.add(wallTrim);

  const keep = new THREE.Mesh(new THREE.CylinderGeometry(.78, .9, 1.9, 10), stone);
  keep.position.y = 1.55;
  castle.add(keep);
  const keepBand = new THREE.Mesh(new THREE.CylinderGeometry(.84, .84, .15, 10), shade);
  keepBand.position.y = 2.22;
  castle.add(keepBand);
  const keepRoof = new THREE.Mesh(new THREE.ConeGeometry(1.08, 1.32, 10), roof);
  keepRoof.position.y = 3.12;
  castle.add(keepRoof);
  const roofCollar = new THREE.Mesh(new THREE.TorusGeometry(.94, .09, 6, 16), trim);
  roofCollar.rotation.x = Math.PI / 2;
  roofCollar.position.y = 2.5;
  castle.add(roofCollar);

  const towerPositions: [number, number][] = [[-1.24, -.88], [1.24, -.88], [-1.24, .88], [1.24, .88]];
  towerPositions.forEach(([tx, tz], index) => {
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(.5, .58, 1.65, 12), index > 1 ? shade : stone);
    tower.position.set(tx, 1.3, tz);
    castle.add(tower);
    for (let merlon = 0; merlon < 8; merlon++) {
      const angle = merlon / 8 * Math.PI * 2;
      const block = new THREE.Mesh(new THREE.BoxGeometry(.18, .25, .18), trim);
      block.position.set(tx + Math.cos(angle) * .48, 2.18, tz + Math.sin(angle) * .48);
      block.rotation.y = -angle;
      castle.add(block);
    }
    const towerRoof = new THREE.Mesh(new THREE.ConeGeometry(.76, 1.08, 12), index % 2 ? darkRoof : roof);
    towerRoof.position.set(tx, 2.62, tz);
    castle.add(towerRoof);
    const finial = new THREE.Mesh(new THREE.SphereGeometry(.09, 8, 6), material(0xffd95a, .35));
    finial.position.set(tx, 3.18, tz);
    castle.add(finial);
  });

  const gateArch = new THREE.Mesh(new THREE.CylinderGeometry(.36, .36, .12, 16, 1, false, 0, Math.PI), material(0x3d2830));
  gateArch.rotation.set(Math.PI / 2, 0, Math.PI / 2);
  gateArch.position.set(0, .78, -1.58);
  castle.add(gateArch);
  const gate = new THREE.Mesh(new THREE.BoxGeometry(.68, .7, .12), material(0x4b2e22));
  gate.position.set(0, .62, -1.59);
  castle.add(gate);

  [[-.32, 1.55, -.82], [.32, 1.55, -.82], [-1.25, 1.35, -1.39], [1.25, 1.35, -1.39]].forEach(([wx, wy, wz]) => {
    const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(.22, .36, .08), trim);
    windowFrame.position.set(wx, wy, wz);
    const glass = new THREE.Mesh(new THREE.BoxGeometry(.12, .25, .09), material(0x50ccec, .28));
    glass.position.set(wx, wy, wz - .01);
    castle.add(windowFrame, glass);
  });

  const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(.025, .025, 1.25, 6), material(0x563a23));
  flagPole.position.set(0, 4.05, 0);
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(.72, .38), material(roofColor, .5));
  flag.position.set(.37, 4.38, 0);
  flag.name = "flag";
  castle.add(flagPole, flag);

  if (selected) {
    const halo = new THREE.Mesh(
      new THREE.RingGeometry(1.95, 2.13, 48),
      new THREE.MeshBasicMaterial({ color: 0x5bd9ff, transparent: true, opacity: .9, side: THREE.DoubleSide }),
    );
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = .05;
    halo.name = "selection";
    castle.add(halo);
  }
  castle.position.set(x, 0, z);
  castle.scale.setScalar(1.08);
  scene.add(castle);
}

export default function WorldScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!host.current) return;
    const container = host.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8fc65b);
    scene.fog = new THREE.Fog(0x9acb68, 25, 42);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-14, 14, 8, -8, .1, 100);
    camera.position.set(15, 19, 20);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.HemisphereLight(0xfff3cf, 0x385a36, 2.3));
    const sun = new THREE.DirectionalLight(0xfff0ca, 3.2);
    sun.position.set(-9, 18, -10);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = sun.shadow.camera.bottom = -18;
    sun.shadow.camera.right = sun.shadow.camera.top = 18;
    scene.add(sun);

    const terrainGeometry = new THREE.PlaneGeometry(38, 25, 48, 32);
    const position = terrainGeometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i); const y = position.getY(i);
      position.setZ(i, Math.sin(x * .48) * .22 + Math.cos(y * .57) * .18 + Math.sin((x + y) * .22) * .28);
    }
    terrainGeometry.computeVertexNormals();
    const terrain = new THREE.Mesh(terrainGeometry, material(0x7eae4d, .92));
    terrain.rotation.x = -Math.PI / 2;
    terrain.receiveShadow = true;
    scene.add(terrain);

    const roadCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-19, .08, 5), new THREE.Vector3(-9, .12, 3),
      new THREE.Vector3(-1, .12, 4), new THREE.Vector3(8, .1, 2), new THREE.Vector3(19, .08, 3),
    ]);
    const road = new THREE.Mesh(new THREE.TubeGeometry(roadCurve, 48, .58, 10, false), material(0xc8a265, 1));
    road.scale.y = .12;
    road.receiveShadow = true;
    scene.add(road);

    const river = new THREE.Group();
    for (let i = -5; i <= 5; i++) {
      const water = new THREE.Mesh(new THREE.CircleGeometry(2.3 + Math.cos(i) * .35, 32), material(0x35a8c4, .35));
      water.rotation.x = -Math.PI / 2;
      water.position.set(i * 1.15 + 1, .16, i * 1.5);
      river.add(water);
    }
    scene.add(river);

    for (let i = 0; i < 72; i++) {
      const side = i % 3;
      const x = side === 0 ? -15 + (i * 1.73) % 8 : side === 1 ? 8 + (i * 1.31) % 8 : -13 + (i * 2.17) % 27;
      const z = side === 0 ? -9 + (i * 2.1) % 18 : side === 1 ? -8 + (i * 1.9) % 17 : 8 + (i % 3);
      addTree(scene, x, z, .55 + (i % 5) * .08);
    }
    for (let i = 0; i < 12; i++) {
      const mountain = new THREE.Mesh(new THREE.ConeGeometry(1.2 + i % 3 * .4, 2.3 + i % 4 * .45, 7), material(i % 2 ? 0x8f8a79 : 0xaaa187));
      mountain.position.set(11 + (i % 4) * 2.2, 1.1, -9 + Math.floor(i / 4) * 2.1);
      mountain.rotation.y = i * .7;
      mountain.castShadow = mountain.receiveShadow = true;
      scene.add(mountain);
    }
    cityData.forEach(([x, z, color], index) => addCastle(scene, x, z, color, index === 2));
    scene.traverse((object) => { if (object instanceof THREE.Mesh) object.castShadow = true; });

    const resize = () => {
      const width = container.clientWidth; const height = container.clientHeight;
      const aspect = width / height; const view = 10;
      camera.left = -view * aspect; camera.right = view * aspect; camera.top = view; camera.bottom = -view;
      camera.updateProjectionMatrix(); renderer.setSize(width, height, false);
    };
    resize(); window.addEventListener("resize", resize);
    let frame = 0; let animation = 0;
    const animate = () => {
      frame += .016;
      scene.getObjectByName("selection")?.scale.setScalar(1 + Math.sin(frame * 2.4) * .05);
      scene.traverse((object) => { if (object.name === "flag") object.rotation.y = Math.sin(frame * 2 + object.position.x) * .18; });
      renderer.render(scene, camera); animation = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animation); window.removeEventListener("resize", resize);
      renderer.dispose(); terrainGeometry.dispose(); container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={host} className="world-scene" aria-label="Mundo 3D do reino" />;
}
