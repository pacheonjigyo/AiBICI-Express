import { fabric } from "fabric";
import { AlignGuidelines } from "fabric-guideline-plugin";
import { rotateSvg } from "../icons/RotateIcon.js";
import { getRealUrl, uploadToS3 } from "./FileUpload.js";
import { urlToBase64 } from "./Functions.js";
import { EngineGateway } from "./Gateway.js";

export class CanvasEditor {
  commonStore: any = null;
  canvasStore: any = null;
  engineStore: any = null;
  identityDataStore: any = null;

  id = "";

  theme = "#0288d1";

  colorMain = "#000000";
  colorSub = "#ffffff";

  canvas = new fabric.Canvas("main", {
    preserveObjectStacking: true,
  });

  defaultSize = 512;

  fontFamily = "";

  imageUrl = "";
  image: any = {
    original: null,
    current: null,
  };

  layout = 0;

  name = "";

  paper: any = null;
  paperSafetyZone: any = null;

  percentage = 0;
  previewSize = 100;

  slogan = "";

  keyboardRef: any = {
    arrowUp: {
      ref: null,
      pressed: false,
    },

    arrowDown: {
      ref: null,
      pressed: false,
    },

    arrowLeft: {
      ref: null,
      pressed: false,
    },

    arrowRight: {
      ref: null,
      pressed: false,
    },
  };

  externalCanvas: any = null;

  template: any = null;

  constructor(commonStore, canvasStore) {
    this.commonStore = commonStore;
    this.canvasStore = canvasStore;

    this.canvasSetting();
    this.setKeyEvents();

    this.resizeCanvas();

    this.initGuideline();
  }

  initGuideline = () => {
    const guideline = new AlignGuidelines({
      canvas: this.canvas,
    });

    guideline.init();
  };

  resizeCanvas = async () => {
    const outerCanvasContainer = document.getElementById(
      "fabric-canvas-wrapper",
    );

    if (!outerCanvasContainer) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        const scale = width / this.canvas.getWidth();
        const zoom = this.canvas.getZoom() * scale;

        this.canvas.setDimensions({
          width: width,
          height: height,
        });

        this.canvas.setZoom(1); // reset zoom so pan actions work as expected

        const vpw = this.canvas.width / zoom;
        const vph = this.canvas.height / zoom;

        if (!this.paper) {
          continue;
        }

        const x =
          this.paper.left -
          vpw / 2 +
          (this.paper.width * this.paper.scaleX) / 2; // x is the location where the top left of the viewport should be
        const y =
          this.paper.top -
          vph / 2 +
          (this.paper.height * this.paper.scaleY) / 2; // y idem

        this.canvas.absolutePan({ x: x, y: y });
        this.canvas.setZoom(zoom);
      }
    });

    observer.observe(outerCanvasContainer);
  };

  loadCanvasAsync = async (canvas: any) => {
    return await new Promise((res, rej) => {
      try {
        this.canvas.loadFromJSON(canvas, () => {
          this.canvas.renderAll();

          res(true);
        });
      } catch (e) {
        rej(e);
      }
    });
  };

  zoomIn = () => {
    let percentage = this.previewSize;

    if (percentage + 10 > 150) {
      percentage = 150;
    } else {
      percentage = percentage + 10;
    }

    this.previewSize = percentage;
    // this.init();
  };

  zoomOut = () => {
    let percentage = this.previewSize;

    if (percentage - 10 < 50) {
      percentage = 50;
    } else {
      percentage = percentage - 10;
    }

    this.previewSize = percentage;
    // this.init();
  };

  setKeyEvents = () => {
    // window.addEventListener("wheel", async (e: WheelEvent) => {
    //   if (e.deltaY < 0) {
    //     this.zoomIn();
    //   } else if (e.deltaY > 0) {
    //     this.zoomOut();
    //   }
    // });

    const keyMove = (direction: string) => {
      const offset = 1;
      const objects = this.canvas.getActiveObject();

      if (objects) {
        if (objects["_objects"]) {
          for (const i in objects["_objects"]) {
            const object = objects["_objects"][i];
            const objectType = object.get("type");

            switch (objectType) {
              case "i-text": {
                object.set({
                  top:
                    direction === "top"
                      ? object.top - offset
                      : direction === "bottom"
                      ? object.top + offset
                      : object.top,
                  left:
                    direction === "left"
                      ? object.left - offset
                      : direction === "right"
                      ? object.left + offset
                      : object.left,
                });

                break;
              }

              default:
                object.set({
                  top:
                    direction === "top"
                      ? object.top - offset
                      : direction === "bottom"
                      ? object.top + offset
                      : object.top,
                  left:
                    direction === "left"
                      ? object.left - offset
                      : direction === "right"
                      ? object.left + offset
                      : object.left,
                });

                break;
            }
          }
        } else {
          const objectType = objects.get("type");

          switch (objectType) {
            case "i-text": {
              if (!objects.isEditing) {
                objects.set({
                  top:
                    direction === "top"
                      ? objects.top - offset
                      : direction === "bottom"
                      ? objects.top + offset
                      : objects.top,
                  left:
                    direction === "left"
                      ? objects.left - offset
                      : direction === "right"
                      ? objects.left + offset
                      : objects.left,
                });
              }

              break;
            }

            default:
              objects.set({
                top:
                  direction === "top"
                    ? objects.top - offset
                    : direction === "bottom"
                    ? objects.top + offset
                    : objects.top,
                left:
                  direction === "left"
                    ? objects.left - offset
                    : direction === "right"
                    ? objects.left + offset
                    : objects.left,
              });

              break;
          }
        }

        this.canvas.renderAll();
      }
    };

    window.addEventListener("keydown", async (e) => {
      switch (e.key) {
        case "ArrowUp": {
          e.preventDefault();

          keyMove("top");

          break;
        }

        case "ArrowDown": {
          e.preventDefault();

          keyMove("bottom");

          break;
        }

        case "ArrowLeft": {
          e.preventDefault();

          keyMove("left");

          break;
        }

        case "ArrowRight": {
          e.preventDefault();

          keyMove("right");

          break;
        }
      }
    });

    window.addEventListener("keyup", async (e) => {
      switch (e.key) {
        case "Delete": {
          this.saveCanvas();

          const objects = this.canvas.getActiveObject();

          if (objects) {
            if (objects["_objects"]) {
              objects["_objects"].map((v) => {
                this.canvas.remove(v);

                const dup = [...this.canvasStore.layers];
                const found = dup.findIndex((w) => w.id === v.id);

                dup.splice(found, 1);

                this.canvasStore.setLayers(dup);
              });
            } else {
              this.canvas.remove(objects);

              const dup = [...this.canvasStore.layers];
              const found = dup.findIndex((w) => w.id === objects.id);

              dup.splice(found, 1);

              this.canvasStore.setLayers(dup);
            }

            this.canvas.renderAll();
          }

          break;
        }
      }
    });
  };

  canvasSetting = () => {
    // const mouseHover = (e: any, enabled: boolean) => {
    //   this.saveCanvas();

    //   const object = e.target;
    //   const objectType = object.get("type");

    //   switch (objectType) {
    //     case "i-text": {
    //       object.set({
    //         stroke: this.theme,
    //         strokeWidth: enabled ? 1 : 0,
    //       });

    //       break;
    //     }

    //     default:
    //       object.set({
    //         stroke: this.theme,
    //         strokeWidth: enabled ? 1 : 0,
    //       });

    //       break;
    //   }

    //   this.canvas.renderAll();
    // };

    this.percentage = Math.round(this.previewSize / 10) * 10;

    const svgRotateIcon = encodeURIComponent(rotateSvg);
    const rotateIcon = `data:image/svg+xml;utf8,${svgRotateIcon}`;
    const imgIcon = document.createElement("img");

    imgIcon.src = rotateIcon;

    function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      const size = 48;

      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(imgIcon, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

    fabric.Object.prototype.controls.mtr = new fabric.Control({
      x: 0,
      y: -0.5,
      offsetX: 0,
      offsetY: -40,
      cursorStyle: `grab`,
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
      actionName: "rotate",
      render: renderIcon,
      cornerSize: 38,
    });

    fabric.Object.prototype.set({
      borderColor: this.theme,
      borderScaleFactor: 2,
      cornerColor: "white",
      cornerStrokeColor: this.theme,
      cornerStyle: "circle",
      cornerSize: 10,
      transparentCorners: false,
    });

    this.canvas.on({
      "selection:created": (e) => {
        this.canvasStore.canvas.updateMaterial();

        console.log(e);

        if (e.selected.length < 1) {
          return;
        }

        if (e.selected.length > 1) {
          // multiple item
          this.canvasStore.setGroup(true);
        } else {
          if (e.selected[0]._objects) {
            this.canvasStore.setGroup(true);
          } else {
            this.canvasStore.setGroup(false);
          }

          const index =
            this.canvasStore.layers.findIndex(
              (v: any) => v.id === e.selected[0].id,
            ) ?? -1;

          this.canvasStore.setLayerCurrentId(index);

          const type = e.selected[0].get("type");

          switch (type) {
            case "image": {
              this.canvasStore.setLogoMenu(1);

              break;
            }

            case "i-text": {
              this.canvasStore.setLogoMenu(3);

              break;
            }

            default: {
              this.canvasStore.setLogoMenu(2);

              break;
            }
          }
        }

        return;
      },

      "selection:updated": (e) => {
        this.canvasStore.canvas.updateMaterial();

        console.log(e);

        if (e.selected.length < 1) {
          return;
        }

        if (e.selected.length > 1) {
          // multiple item
          this.canvasStore.setGroup(true);
        } else {
          if (e.selected[0].group) {
            this.canvasStore.setGroup(true);
          } else {
            this.canvasStore.setGroup(false);
          }

          const index =
            this.canvasStore.layers.findIndex(
              (v: any) => v.id === e.selected[0].id,
            ) ?? -1;

          this.canvasStore.setLayerCurrentId(index);

          const type = e.selected[0].get("type");

          switch (type) {
            case "image": {
              this.canvasStore.setLogoMenu(1);

              break;
            }

            case "i-text": {
              this.canvasStore.setLogoMenu(3);

              break;
            }

            default: {
              this.canvasStore.setLogoMenu(2);

              break;
            }
          }
        }

        return;
      },

      "selection:cleared": () => {
        this.canvasStore.canvas.updateMaterial();

        this.canvasStore.setGroup(false);
        this.canvasStore.setLayerCurrentId(-1);

        return;
      },

      "object:modified": function (e) {
        this.canvasStore.canvas.updateMaterial();

        const object = e.target;

        object.opacity = 1;
      },

      "object:moving": (e) => {
        const object = e.target;

        object.opacity = 0.5;

        if (object.get("type") === "activeSelection") {
          return;
        }

        const data = this.canvasStore.layers.find((v) => v.id === object.id);

        if (!data) {
          return;
        }

        if (!data.locked) {
          data.left = e.target.left;
          data.top = e.target.top;
        }

        object.set({
          left: data.left,
          top: data.top,
        });

        this.canvas.renderAll();

        return;
      },

      "object:scaling": (e) => {
        const object = e.target;

        if (object.get("type") === "activeSelection") {
          return;
        }

        const width = Math.floor(
          (object.width * object.scaleX) / (100 / this.percentage),
        );
        const height = Math.floor(
          (object.height * object.scaleY) / (100 / this.percentage),
        );

        const dup = [...this.canvasStore.layers];
        const dupIndex = this.canvasStore.layers.findIndex(
          (v) => v.id === object.id,
        );

        dup[dupIndex].width = width;
        dup[dupIndex].height = height;

        this.canvasStore.setLayers(dup);

        return;
      },
    });

    // this.canvas.controlsAboveOverlay = true;
  };

  getImageFromUrl = (url: string, svg: boolean) => {
    return new Promise((resolve, reject) => {
      try {
        if (svg) {
          const group: any = [];

          new fabric.loadSVGFromURL(
            url,
            () => {
              const loadedObjects = new fabric.Group(group);

              resolve(loadedObjects);
            },
            (item, object) => {
              const type = object.get("type");

              if (type === "text") {
                const objectJson = object.toObject();
                const newObject = new fabric.IText(objectJson.text, objectJson);

                group.push(newObject);

                this.canvas.remove(object);
              } else {
                group.push(object);
              }
            },
          );
        } else {
          new fabric.Image.fromURL(url, async (image) => {
            image.set({
              left: this.canvas.width / 2 - image.width / 2,
              top: this.canvas.height / 2 - image.height / 2,
              width: image.width,
              height: image.height,
              selectable: true,

              id: this.canvasStore.layers.length,
              url: this.imageUrl,
            });

            resolve(image);
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  init = async (type, index) => {
    this.canvas.clear();

    this.percentage = Math.round(this.previewSize / 10) * 10;
    this.externalCanvas = await this.loadCanvasFromDB();

    if (this.externalCanvas) {
      await this.loadCanvasAsync(this.externalCanvas.canvas);

      this.paper = this.canvas.getObjects().find((v) => !v.id);

      this.canvasStore.setLayers(this.externalCanvas.layers);
      this.image.original = this.canvas.getObjects().find((v) => v.id === 0);
    } else {
      this.initLayers();

      const outerCanvasContainer = document.getElementById(
        "fabric-canvas-wrapper",
      );

      if (!outerCanvasContainer) {
        return;
      }

      if (this.canvasStore.cupSize === 0) {
        this.paper = await this.getImageFromUrl("/images/papercup65.svg", true);
      } else if (this.canvasStore.cupSize === 1) {
        this.paper = await this.getImageFromUrl(
          "/images/papercup100.svg",
          true,
        );
      } else if (this.canvasStore.cupSize === 2) {
        this.paper = await this.getImageFromUrl(
          "/images/papercup130.svg",
          true,
        );
      } else if (this.canvasStore.cupSize === 3) {
        this.paper = await this.getImageFromUrl(
          "/images/papercup160.svg",
          true,
        );
      }

      const paperRatio = this.canvas.width / this.paper.width;

      this.paper.set({
        scaleX: (paperRatio * 4.2) / 5,
        scaleY: (paperRatio * 4.2) / 5,

        selectable: false,

        hoverCursor: "auto",
      });

      this.paper._objects[0].set({
        fill: "white",
      });

      this.paperSafetyZone = fabric.util.object.clone(this.paper._objects[0]);

      const paperSafetyZoneRatio =
        this.canvas.width / this.paperSafetyZone.width;

      this.paperSafetyZone.set({
        fill: "transparent",

        strokeDashArray: [3, 3],
        stroke: "gray",

        scaleX: (paperSafetyZoneRatio * 4) / 5,
        scaleY: (paperSafetyZoneRatio * 4) / 5,
      });

      this.paper.addWithUpdate(this.paperSafetyZone);

      this.groupAlign(this.paper, "bottom");

      this.paper.set({
        left:
          this.canvas.width / 2 - (this.paper.width * this.paper.scaleX) / 2,
        top:
          this.canvas.height / 2 - (this.paper.height * this.paper.scaleY) / 2,
      });

      this.canvas.setOverlayImage(this.paperSafetyZone);

      this.template = await this.getImageFromUrl(
        `/templates/${type}/${index}.svg`,
        true,
      );

      const templateRatio = this.canvas.width / this.template.width;

      this.template.set({
        scaleX: (templateRatio * 4.2) / 5,
        scaleY: (templateRatio * 4.2) / 5,
        globalCompositeOperation: "source-atop",
      });

      this.template.set({
        left:
          this.canvas.width / 2 -
          (this.template.width * this.template.scaleX) / 2,
        top:
          this.canvas.height / 2 -
          (this.template.height * this.template.scaleY) / 2,
      });

      const items = this.template._objects;

      this.template._restoreObjectsState();
      this.canvas.remove(this.template);

      for (let i = 0; i < items.length; i++) {
        items[i].set({
          globalCompositeOperation: "source-atop",
        });

        this.canvas.add(items[i]);
      }

      this.canvas.add(this.paper);
      this.canvas.sendToBack(this.paper);
    }

    this.canvas.zoomToPoint(new fabric.Point(0, 0), this.percentage / 100);
    this.canvas.renderAll();

    this.saveCanvas();
  };

  getCanvasDataURL = () => {
    this.percentage = Math.round(this.previewSize / 10) * 10;

    this.canvas.zoomToPoint(new fabric.Point(0, 0), 1.0);

    const data = this.canvas.toDataURL({
      left: this.paper.left + 1,
      top: this.paper.top + 1,
      width: this.paper.width * (100 / this.percentage) - 2,
      height: this.paper.height * (100 / this.percentage) - 2,
      format: "png",
    });

    this.canvas.zoomToPoint(new fabric.Point(0, 0), this.percentage / 100);

    return data.split(",")[1];
  };

  createRect = async () => {
    this.saveCanvas();

    const size = this.paper.width / 3;

    const rect = new fabric.Rect({
      left: this.paper.left + this.paper.width / 2 - size / 2,
      top: this.paper.top + this.paper.height / 2 - size / 2,
      width: size,
      height: size,
      fill: this.canvasStore.palette.main,
      strokeWidth: 0,

      id: this.canvasStore.layers.length,

      globalCompositeOperation: "source-atop",
    });

    rect.set({
      active: true,
    });

    this.canvas.add(rect);
    this.canvas.setActiveObject(rect);
    this.canvas.renderAll();

    const index = this.addLayers(rect);

    this.canvasStore.setLayerCurrentId(index);
  };

  createTriangle = async () => {
    this.saveCanvas();

    const size = this.paper.width / 3;

    const triangle = new fabric.Triangle({
      width: size,
      height: (Math.sqrt(3) / 2) * size,
      left: this.paper.left + this.paper.width / 2 - size / 2,
      top: this.paper.top + this.paper.height / 2 - size / 2,
      fill: this.canvasStore.palette.main,
      strokeWidth: 0,

      id: this.canvasStore.layers.length,

      globalCompositeOperation: "source-atop",
    });

    this.canvas.add(triangle);
    this.canvas.setActiveObject(triangle);
    this.canvas.renderAll();

    const index = this.addLayers(triangle);

    this.canvasStore.setLayerCurrentId(index);
  };

  createOval = async () => {
    this.saveCanvas();

    const size = this.paper.width / 3;

    const circle = new fabric.Circle({
      radius: size / 2,
      left: this.paper.left + this.paper.width / 2 - size / 2,
      top: this.paper.top + this.paper.height / 2 - size / 2,
      fill: this.canvasStore.palette.main,
      strokeWidth: 0,

      id: this.canvasStore.layers.length,

      globalCompositeOperation: "source-atop",
    });

    this.canvas.add(circle);
    this.canvas.setActiveObject(circle);
    this.canvas.renderAll();

    const index = this.addLayers(circle);

    this.canvasStore.setLayerCurrentId(index);
  };

  createText = async (data: string, fontFamily: string) => {
    this.saveCanvas();

    const text = new fabric.IText(data, {
      fill: this.canvasStore.palette.main,

      fontSize: 40,
      fontFamily,
    });

    text.set({
      left: this.paper.left + this.paper.width / 2 - text.width / 2,
      top: this.paper.top + this.paper.height / 2 - text.height / 2,

      strokeWidth: 0,

      id: this.canvasStore.layers.length,

      globalCompositeOperation: "source-atop",
    });

    this.canvas.add(text);
    this.canvas.setActiveObject(text);
    this.canvas.renderAll();

    const index = this.addLayers(text);

    this.canvasStore.setLayerCurrentId(index);
  };

  createImage = async (url: string, save: boolean, ref: any) => {
    if (save) {
      this.saveCanvas();
    }

    const imageUrl = getRealUrl(url);
    const imageData = await urlToBase64(imageUrl);

    let image: any = null;

    if (imageData.includes("data:image/svg")) {
      image = await this.getImageFromUrl(this.imageUrl, true);
    } else {
      image = await this.getImageFromUrl(imageData, false);
    }

    if (!ref) {
      image.scaleToWidth(this.paper.width / 2);
      image.scaleToHeight(this.paper.height / 2);

      image.set({
        left:
          this.paper.left +
          this.paper.width / 2 -
          (image.width * image.scaleX) / 2,
        top:
          this.paper.top +
          this.paper.height / 2 -
          (image.height * image.scaleY) / 2,
        selectable: true,
        strokeWidth: 0,

        id: this.canvasStore.layers.length,
        url: imageUrl,

        globalCompositeOperation: "source-atop",
      });
    } else {
      image.scaleToWidth(ref.width * ref.scaleX);
      image.scaleToHeight(ref.height * ref.scaleY);

      image.set({
        left: ref.left,
        top: ref.top,
        width: ref.width,
        height: ref.height,
        selectable: true,
        strokeWidth: 0,

        id: this.canvasStore.layers.length,
        url: imageUrl,
      });
    }

    this.canvas.add(image);
    this.canvas.setActiveObject(image);
    this.canvas.renderAll();

    const index = this.addLayers(image);

    this.canvasStore.setLayerCurrentId(index);
  };

  setLogoShape = async (id: number, shape: string) => {
    this.saveCanvas();

    const data = this.canvas.getObjects().find((v) => v.id === id);

    if (!data) {
      return;
    }

    data.clipPath = null;

    this.canvas.renderAll();

    switch (shape) {
      case "rectangle": {
        break;
      }

      case "circle": {
        const circle = new fabric.Circle({
          radius: data.width / 2,
          left: -1 * (data.width / 2),
          top: -1 * (data.height / 2),
          fill: "#000000",
        });

        data.clipPath = circle;

        break;
      }

      case "triangle": {
        const triangle = new fabric.Triangle({
          width: data.width,
          height: (Math.sqrt(3) / 2) * data.width,
          left: -1 * (data.width / 2),
          top: -1 * (data.height / 2),
          fill: "#000000",
        });

        data.clipPath = triangle;

        break;
      }

      case "heart": {
        const heartPath =
          "M 272.70141,238.71731 \
        C 206.46141,238.71731 152.70146,292.4773 152.70146,358.71731  \
        C 152.70146,493.47282 288.63461,528.80461 381.26391,662.02535 \
        C 468.83815,529.62199 609.82641,489.17075 609.82641,358.71731 \
        C 609.82641,292.47731 556.06651,238.7173 489.82641,238.71731  \
        C 441.77851,238.71731 400.42481,267.08774 381.26391,307.90481 \
        C 362.10311,267.08773 320.74941,238.7173 272.70141,238.71731  \
        z ";
        const heart = new fabric.Path(heartPath);

        const heartWidth = data.width; // 원하는 너비 값 설정
        const heartScale = heartWidth / heart.width; // 스케일 계산

        heart.set({
          scaleX: heartScale,
          scaleY: heartScale,
          left: -1 * (data.width / 2),
          top: -1 * (data.height / 2),
          fill: "#000000",
        });

        data.clipPath = heart;

        break;
      }
    }

    const dup = [...this.canvasStore.layers];
    const dupIndex =
      this.canvasStore.layers.findIndex((v) => v.id === id) ?? -1;

    dup[dupIndex].morph = shape;

    this.canvasStore.setLayers(dup);

    this.canvas.renderAll();
  };

  setFocusOff = () => {
    this.canvas.discardActiveObject();
    this.canvas.renderAll();
  };

  setLocked = (id: number) => {
    this.saveCanvas();

    const dup = [...this.canvasStore.layers];
    const dupIndex =
      this.canvasStore.layers.findIndex((v) => v.id === id) ?? -1;

    dup[dupIndex].locked = !dup[dupIndex].locked;

    this.canvasStore.setLayers(dup);

    const data = this.canvas.getObjects().find((v) => v.id === id);

    data.set({
      hasControls: !dup[dupIndex].locked,
    });

    this.canvas.discardActiveObject();
    this.canvas.setActiveObject(data);

    this.canvas.renderAll();
  };

  setImageRemoveBackground = async (id: number) => {
    this.saveCanvas();

    const dup = [...this.canvasStore.layers];
    const dupIndex =
      this.canvasStore.layers.findIndex((v) => v.id === id) ?? -1;

    dup[dupIndex].backgroundRemoved = true;

    this.canvasStore.setLayers(dup);

    const data = this.canvas.getObjects().find((v) => v.id === id);
    const image = await EngineGateway({
      query: "remove/v1",
      method: "POST",
      data: {
        image: dup[dupIndex].url,
      },
      auth: false,
    });

    this.canvas.remove(data);

    dup[dupIndex].backgroundRemoved = false;
    dup.splice(dupIndex, 1);

    this.canvasStore.setLayers(dup);

    this.createImage(image.url, false, data);
  };

  setMainColor = async (id: number, color: string) => {
    let objects: any = null;

    if (this.canvasStore.group) {
      objects = this.canvas.getActiveObject()._objects;
    } else {
      objects = [this.canvas.getObjects().find((v) => v.id === id)];
    }

    objects.map((object) => {
      const dataType = object.get("type");

      switch (dataType) {
        case "image":
          break;

        case "i-text": {
          object.set({
            backgroundColor: color,
          });

          break;
        }

        default: {
          object.set({
            fill: color,
          });

          break;
        }
      }

      const dup = [...this.canvasStore.layers];
      const dupIndex =
        this.canvasStore.layers.findIndex((v) => v.id === object.id) ?? -1;

      if (dupIndex === -1) {
        return;
      }

      dup[dupIndex].colorMain = color;

      this.canvasStore.setLayers(dup);
    });

    this.canvas.renderAll();
  };

  setSubColor = async (id: number, color: string) => {
    let objects: any = null;

    if (this.canvasStore.group) {
      objects = this.canvas.getActiveObject()._objects;
    } else {
      objects = [this.canvas.getObjects().find((v) => v.id === id)];
    }

    objects.map((object) => {
      const dataType = object.get("type");

      switch (dataType) {
        case "i-text": {
          object.set({
            stroke: color,
          });

          break;
        }

        default: {
          object.set({
            stroke: color,
          });

          break;
        }
      }

      const dup = [...this.canvasStore.layers];
      const dupIndex =
        this.canvasStore.layers.findIndex((v) => v.id === object.id) ?? -1;

      dup[dupIndex].colorSub = color;

      this.canvasStore.setLayers(dup);
    });

    this.canvas.renderAll();
  };

  setTextColor = async (id: number, color: string) => {
    let objects: any = null;

    if (this.canvasStore.group) {
      objects = this.canvas.getActiveObject()._objects;
    } else {
      objects = [this.canvas.getObjects().find((v) => v.id === id)];
    }

    objects.map((object) => {
      const dataType = object.get("type");

      switch (dataType) {
        case "i-text": {
          object.set({
            fill: color,
          });

          break;
        }

        default: {
          break;
        }
      }

      const dup = [...this.canvasStore.layers];
      const dupIndex =
        this.canvasStore.layers.findIndex((v) => v.id === object.id) ?? -1;

      dup[dupIndex].colorText = color;

      this.canvasStore.setLayers(dup);
    });

    this.canvas.renderAll();
  };

  setStroke = async (id: number) => {
    const dup = [...this.canvasStore.layers];
    const dupIndex =
      this.canvasStore.layers.findIndex((v) => v.id === id) ?? -1;

    dup[dupIndex].stroke = !dup[dupIndex].stroke;

    this.canvasStore.setLayers(dup);

    const data = this.canvas.getObjects().find((v) => v.id === id);
    const dataType = data.get("type");

    switch (dataType) {
      case "i-text": {
        data.set({
          strokeWidth: dup[dupIndex].stroke ? 1 : 0,
        });

        break;
      }

      default: {
        data.set({
          strokeWidth: dup[dupIndex].stroke ? 5 : 0,
        });

        break;
      }
    }

    this.canvas.renderAll();
  };

  setPlacement = async (id: number, code: string) => {
    const data = this.canvas.getObjects().find((v) => v.id === id);

    switch (code) {
      case "doubleFront": {
        this.canvas.bringToFront(data);

        break;
      }

      case "front": {
        this.canvas.bringForward(data);

        break;
      }

      case "back": {
        this.canvas.sendBackwards(data);

        break;
      }

      case "doubleBack": {
        this.canvas.sendToBack(data);

        break;
      }
    }

    this.canvas.renderAll();
  };

  setRoundBorder = async (id: number, value: number) => {
    let objects: any = null;

    if (this.canvasStore.group) {
      objects = this.canvas.getActiveObject()._objects;
    } else {
      objects = [this.canvas.getObjects().find((v) => v.id === id)];
    }

    objects.map((object) => {
      const dataType = object.get("type");

      switch (dataType) {
        case "rect": {
          object.set({
            rx: value,
            ry: value,
          });

          break;
        }

        default: {
          break;
        }
      }

      const dup = [...this.canvasStore.layers];
      const dupIndex =
        this.canvasStore.layers.findIndex((v) => v.id === object.id) ?? -1;

      dup[dupIndex].rounded = value;

      this.canvasStore.setLayers(dup);
    });

    this.canvas.renderAll();
  };

  setFontSize = async (id: number, value: number) => {
    let objects: any = null;

    if (this.canvasStore.group) {
      objects = this.canvas.getActiveObject()._objects;
    } else {
      objects = [this.canvas.getObjects().find((v) => v.id === id)];
    }

    objects.map((object) => {
      const dataType = object.get("type");

      switch (dataType) {
        case "i-text": {
          object.set({
            fontSize: value,
          });

          break;
        }

        default: {
          break;
        }
      }

      const dup = [...this.canvasStore.layers];
      const dupIndex =
        this.canvasStore.layers.findIndex((v) => v.id === object.id) ?? -1;

      dup[dupIndex].fontSize = value;

      this.canvasStore.setLayers(dup);
    });

    this.canvas.renderAll();
  };

  setFontFamily = async (id: number, value: string) => {
    let objects: any = null;

    if (this.canvasStore.group) {
      objects = this.canvas.getActiveObject()._objects;
    } else {
      objects = [this.canvas.getObjects().find((v) => v.id === id)];
    }

    objects.map((object) => {
      const dataType = object.get("type");

      switch (dataType) {
        case "i-text": {
          object.set({
            fontFamily: value,
          });

          break;
        }

        default: {
          break;
        }
      }

      const dup = [...this.canvasStore.layers];
      const dupIndex =
        this.canvasStore.layers.findIndex((v) => v.id === object.id) ?? -1;

      dup[dupIndex].fontFamily = value;

      this.canvasStore.setLayers(dup);
    });

    this.canvas.renderAll();
  };

  setFontBold = async (id: number) => {
    let objects: any = null;

    if (this.canvasStore.group) {
      objects = this.canvas.getActiveObject()._objects;
    } else {
      objects = [this.canvas.getObjects().find((v) => v.id === id)];
    }

    objects.map((object) => {
      const dataType = object.get("type");

      const dup = [...this.canvasStore.layers];
      const dupIndex =
        this.canvasStore.layers.findIndex((v) => v.id === object.id) ?? -1;

      dup[dupIndex].fontBold = !dup[dupIndex].fontBold;

      this.canvasStore.setLayers(dup);

      switch (dataType) {
        case "i-text": {
          object.set({
            fontWeight: dup[dupIndex].fontBold ? "bold" : "normal",
          });

          break;
        }

        default: {
          break;
        }
      }
    });

    this.canvas.renderAll();
  };

  setFontItalic = async (id: number) => {
    let objects: any = null;

    if (this.canvasStore.group) {
      objects = this.canvas.getActiveObject()._objects;
    } else {
      objects = [this.canvas.getObjects().find((v) => v.id === id)];
    }

    objects.map((object) => {
      const dataType = object.get("type");

      const dup = [...this.canvasStore.layers];
      const dupIndex =
        this.canvasStore.layers.findIndex((v) => v.id === object.id) ?? -1;

      dup[dupIndex].fontStyle = !dup[dupIndex].fontStyle;

      this.canvasStore.setLayers(dup);

      switch (dataType) {
        case "i-text": {
          object.set({
            fontStyle: dup[dupIndex].fontStyle ? "italic" : "normal",
          });

          break;
        }

        default: {
          break;
        }
      }
    });

    this.canvas.renderAll();
  };

  setFontUnderline = async (id: number) => {
    let objects: any = null;

    if (this.canvasStore.group) {
      objects = this.canvas.getActiveObject()._objects;
    } else {
      objects = [this.canvas.getObjects().find((v) => v.id === id)];
    }

    objects.map((object) => {
      const dataType = object.get("type");

      const dup = [...this.canvasStore.layers];
      const dupIndex =
        this.canvasStore.layers.findIndex((v) => v.id === object.id) ?? -1;

      dup[dupIndex].fontUnderline = !dup[dupIndex].fontUnderline;

      this.canvasStore.setLayers(dup);

      switch (dataType) {
        case "i-text": {
          object.set({
            underline: dup[dupIndex].fontUnderline,
          });

          break;
        }

        default: {
          break;
        }
      }
    });

    this.canvas.renderAll();
  };

  removeObject = async (id: number) => {
    this.saveCanvas();

    const dup = [...this.canvasStore.layers];
    const dupIndex =
      this.canvasStore.layers.findIndex((v) => v.id === id) ?? -1;

    const data = this.canvas.getObjects().find((v) => v.id === id);

    this.canvas.remove(data);

    dup.splice(dupIndex, 1);

    this.canvasStore.setLayers(dup);
  };

  initLayers = () => {
    this.canvasStore.setLayers([]);
  };

  addLayers = (value: any) => {
    const width = Math.floor(
      (value.width * value.scaleX) / (100 / this.percentage),
    );
    const height = Math.floor(
      (value.height * value.scaleY) / (100 / this.percentage),
    );

    const data = [
      ...this.canvasStore.layers,

      {
        id: value.id,

        alignment: null,

        backgroundRemoved: false,
        border: false,
        borderColor: null,

        colorMain: this.colorSub,
        colorSub: this.colorSub,
        colorText: this.colorMain,

        fontFamily: value.fontFamily,
        fontStyle: null,
        fontSize: value.fontSize,

        fontBold: false,
        fontItalic: false,
        fontUnderline: false,

        fontDiameter: 0,
        fontKerning: 0,
        fontFlipped: false,

        left: value.left,
        locked: false,

        morph: "rectangle",

        placement: null,

        rounded: 0,

        stroke: false,

        top: value.top,
        type: value.get("type"),

        url: value.url,

        width,
        height,
      },
    ];

    this.canvasStore.setLayers(data);

    return (
      this.canvasStore.layers.findIndex((v: any) => v.id === value.id) ?? -1
    );
  };

  saveCanvas = () => {
    const canvas = JSON.stringify(this.canvas.toObject(["id", "selectable"]));
    const data = {
      canvas,
      layers: this.canvasStore.layers,
    };

    const copied = this.canvasStore.canvasState;

    if (copied.undo.length > 9) {
      copied.undo.shift();
    }

    copied.undo.push(data);

    this.canvasStore.setCanvasState({
      ...this.canvasStore.canvasState,

      undo: copied.undo,
    });
  };

  playCanvas = async (type: string) => {
    let rollbackData: any = null;

    const copied = this.canvasStore.canvasState;

    switch (type) {
      case "undo": {
        rollbackData = copied.undo.pop();

        if (!rollbackData) {
          return;
        }

        const canvas = JSON.stringify(
          this.canvas.toObject(["id", "selectable"]),
        );

        const data = {
          canvas,
          layers: this.canvasStore.layers,
        };

        copied.redo.push(data);

        break;
      }

      case "redo": {
        rollbackData = copied.redo.pop();

        if (!rollbackData) {
          return;
        }

        const canvas = JSON.stringify(
          this.canvas.toObject(["id", "selectable"]),
        );

        const data = {
          canvas,
          layers: this.canvasStore.layers,
        };

        copied.undo.push(data);

        break;
      }

      default: {
        break;
      }
    }

    if (!rollbackData) {
      return;
    }

    this.canvas.clear();

    await this.loadCanvasAsync(rollbackData.canvas);

    this.canvas.renderAll();

    this.canvasStore.setLayers(rollbackData.layers);
    this.canvasStore.setCanvasState(copied);
  };

  initDB = (id: number) => {
    localStorage.removeItem(`web_aibici_editor_${id}`);
  };

  uploadCanvasGraphic = async (id: string) => {
    const canvas = JSON.stringify(this.canvas.toObject(["id", "selectable"]));
    const data = {
      canvas,
      layers: this.canvasStore.layers,
    };

    const base64Content = btoa(
      unescape(encodeURIComponent(JSON.stringify(data))),
    );

    return await uploadToS3(
      base64Content,
      `brand/${id}/graphic`,
      "json",
      "text/plain",
    );
  };

  loadCanvasFromDB = async () => {
    try {
      const data = this.identityDataStore.detailedSectionData.logo.logoGraphic;

      this.canvasStore.setExternalCanvas(true);

      const resp = await fetch(data);
      const json = await resp.json();

      return json;
    } catch {
      this.canvasStore.setExternalCanvas(false);

      return null;
    }
  };

  convertToSVG = () => {
    this.canvas.setOverlayImage(null);
    this.canvas.clipPath = this.paper;

    const svg = this.canvas.toSVG({
      viewBox: {
        x: this.paper.left + 1,
        y: this.paper.top + 1,
      },
    });

    this.canvas.setOverlayImage(this.paperSafetyZone);
    this.canvas.clipPath = null;

    const xml = new DOMParser().parseFromString(svg, "image/svg+xml");

    console.log(xml);

    return svg;
  };

  updateMaterial = async () => {
    this.percentage = Math.round(this.previewSize / 10) * 10;

    this.canvas.backgroundColor = "white";
    this.canvas.zoomToPoint(new fabric.Point(0, 0), 1.0);

    const data = this.canvas.toDataURL({
      left: this.paper.left + 1,
      // top: this.paper.top + 1,
      width: this.paper.width * this.paper.scaleX,
      height: this.paper.width * this.paper.scaleY,
      format: "png",
    });

    this.canvasStore.setMaterial(data);

    this.canvas.backgroundColor = "transparent";
    this.canvas.zoomToPoint(new fabric.Point(0, 0), this.percentage / 100);
  };

  groupAlign = (group, direction) => {
    if (!group) {
      return;
    }

    const groupWidth = group.getBoundingRect(true).width,
      groupHeight = group.getBoundingRect(true).height,
      scaleFactor = group.scaleX;

    group.forEachObject(function (item) {
      const itemWidth = item.getBoundingRect().width * scaleFactor,
        itemHeight = item.getBoundingRect().height * scaleFactor;

      if (direction === "left") {
        item.set({
          left: -groupWidth / 2 + itemWidth / 2,
        });
      } else if (direction === "top") {
        item.set({
          top: -groupHeight / 2 + itemHeight / 2,
        });
      } else if (direction === "right") {
        item.set({
          left: groupWidth / 2 - itemWidth / 2,
        });
      } else if (direction === "bottom") {
        item.set({
          left: groupWidth / 2 - itemWidth / 2,
          top: groupHeight / 2 - itemHeight / 2,
        });
      } else if (direction === "center") {
        item.set({
          left: 0,
          top: 0,
        });
      }
    });

    group.forEachObject(function (item) {
      group.removeWithUpdate(item).addWithUpdate(item);
    });

    group.setCoords();

    this.canvas.renderAll();
  };
}
