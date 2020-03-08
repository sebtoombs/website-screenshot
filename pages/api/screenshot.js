import captureWebsite from "capture-website";
import { createCanvas, Image } from "canvas";
import to from "../../lib/to";
import validateForm from "../../lib/validateForm";

export default async (req, res) => {
  const width = +req.query.width;
  const height = +req.query.height;
  let url = req.query.url;

  if (!url.match(/https?:\/\//)) url = "https://" + url;

  const [validateErr, value] = await validateForm({
    url,
    width,
    height
  });
  if (validateErr) {
    res.status(400).json(validateErr);
    return;
  }

  const [err, buffer] = await to(getScreenshot({ width, height, url }));

  if (err) {
    console.log("Error!", err);
    res.status(500).json(err);
    return;
  }

  res.status(200).send(buffer);
};

function getScreenshot({ url, width, height }) {
  return captureWebsite.buffer(url, {
    width,
    height,
    type: "png",
    //quality: 1
    launchOptions: {
      //headless: false,
      headless: true,
      ignoreDefaultArgs: true,
      userDataDir: "tmp/", //this will save all sessions to the same dir. maybe not ideal
      args: [
        "--headless",
        "--use-mock-keychain",
        "--disable-canvas-aa", // Disable antialiasing on 2d canvas
        "--disable-2d-canvas-clip-aa", // Disable antialiasing on 2d canvas clips
        //"--disable-gl-drawing-for-tests", // BEST OPTION EVER! Disables GL drawing operations which produce pixel output. With this the GL output will not be correct but tests will run faster.
        "--disable-dev-shm-usage", // ???
        "--no-zygote", // wtf does that mean ?
        "--use-gl=swiftshader", // better cpu usage with --use-gl=desktop rather than --use-gl=swiftshader, still needs more testing.
        "--enable-webgl",
        "--hide-scrollbars",
        "--mute-audio",
        "--no-first-run",
        "--disable-infobars",
        "--disable-breakpad",
        //'--ignore-gpu-blacklist',
        //"--window-size=1280,1200", // see defaultViewport
        "--user-data-dir=./tmp", // created in index.js, guess cache folder ends up inside too.
        "--no-sandbox", // meh but better resource comsuption
        "--disable-setuid-sandbox" // same
      ],
      devtools: false
      /*defaultViewport: {
        //--window-size in args
        width: 1280,
        height: 1200
      }*/
    }
  });
}

/*export default async (req, res) => {
  const WIDTH = 1280;
  const HEIGHT = 1200;

  const FrameWidth = { h: 50, v: 10 };

  const CanvasWidth = WIDTH + 2 * FrameWidth.v;
  const CanvasHeight = HEIGHT + 2 * FrameWidth.h;

  const hrstart = process.hrtime();

  const canvas = createCanvas(CanvasWidth, CanvasHeight);
  const ctx = canvas.getContext("2d");

  process.env.DISPLAY = "0";
  process.env.PREBOOT_CHROME = true;
  process.env.MAX_CONCURRENT_SESSIONS = 10;

  const buffer = await captureWebsite.buffer("https://sebtoombs.com", {
    width: WIDTH,
    height: HEIGHT,
    type: "png",
    //quality: 1
    launchOptions: {
      //headless: false,
      headless: true,
      ignoreDefaultArgs: true,
      userDataDir: "tmp/", //this will save all sessions to the same dir. maybe not ideal
      args: [
        "--headless",
        "--use-mock-keychain",
        "--disable-canvas-aa", // Disable antialiasing on 2d canvas
        "--disable-2d-canvas-clip-aa", // Disable antialiasing on 2d canvas clips
        //"--disable-gl-drawing-for-tests", // BEST OPTION EVER! Disables GL drawing operations which produce pixel output. With this the GL output will not be correct but tests will run faster.
        "--disable-dev-shm-usage", // ???
        "--no-zygote", // wtf does that mean ?
        "--use-gl=swiftshader", // better cpu usage with --use-gl=desktop rather than --use-gl=swiftshader, still needs more testing.
        "--enable-webgl",
        "--hide-scrollbars",
        "--mute-audio",
        "--no-first-run",
        "--disable-infobars",
        "--disable-breakpad",
        //'--ignore-gpu-blacklist',
        //"--window-size=1280,1200", // see defaultViewport
        "--user-data-dir=./tmp", // created in index.js, guess cache folder ends up inside too.
        "--no-sandbox", // meh but better resource comsuption
        "--disable-setuid-sandbox" // same
      ],
      devtools: false
      /*defaultViewport: {
        //--window-size in args
        width: 1280,
        height: 1200
      }*
    }
  });

  //Turn the screenshot into an Image object
  const image = new Image();
  image.src = buffer;

  //Draw the image to the canvas
  ctx.drawImage(image, FrameWidth.v, FrameWidth.h, WIDTH, HEIGHT);

  //Draw the frame
  drawFrame(ctx, CanvasWidth, CanvasHeight, FrameWidth);

  //Watermark it
  ctx.font = "50px Impact";
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillText("SebToombs", WIDTH - 350, HEIGHT - 100);

  const hrend = process.hrtime(hrstart);

  console.info("Execution time: %ds %dms", hrend[0], hrend[1] / 1000000);

  res.status(200).send(canvas.toBuffer());

  //res.status(200).send(buffer);
};
*/
