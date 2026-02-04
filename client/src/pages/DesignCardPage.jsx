import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Type, Image, Square, Circle, Trash2, Send, Palette, Facebook, Download, FileText, Triangle, Star, Hexagon, Pentagon, Minus, Shapes, X, Smile } from 'lucide-react';

// Fabric.js, html2canvas, and jsPDF are loaded from CDN
const { fabric } = window;
const { jsPDF } = window.jspdf;

const DesignCardPage = () => {
  const [currentSide, setCurrentSide] = useState(0);
  const [canvases, setCanvases] = useState([null, null, null, null]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showShapesPanel, setShowShapesPanel] = useState(false);
  const [showStickersPanel, setShowStickersPanel] = useState(false);
  const canvasContainerRef = useRef(null);
  const sideNames = ['Mặt trước', 'Mặt sau'];

  // A6 landscape dimensions: 148mm x 105mm
  // At 96 DPI: 560px x 400px
  const CANVAS_WIDTH = 560;
  const CANVAS_HEIGHT = 400;

  // Sticker catalog
  const stickers = [
    // STICKER .SVG
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205840/16_zao2ac.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205838/47_sd82nj.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205836/4_f1hxex.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205837/40_comkgr.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205834/21_jtscvm.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205834/21_jtscvm.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205833/9_taae9m.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205832/8_lse9ey.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205832/7_oesnux.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205831/62_vpgzpc.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205828/6_ekgexg.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205828/6_ekgexg.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205821/51_tvuztz.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205820/5_xynkbc.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205819/50_d3lph8.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205819/49_g02xza.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205817/48_fbdodf.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205816/46_yahdje.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205816/45_llnfds.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205815/43_k9fmy8.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205815/44_ck1jup.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205813/42_ffk6yi.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205812/41_cmqzyf.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205811/38_ix4ljj.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205811/37_ktrelk.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205810/36_mvhzvr.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205809/35_fc3x35.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205808/34_xfgum9.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205808/33_melt9e.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205807/32_altvfz.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205806/31_jrbrx1.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205805/30_gm9tee.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205804/3_gmfusu.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205803/29_kr5wqr.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205802/28_dq7y0w.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205802/27_vscbpq.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205801/26_t8dvlm.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205800/25_mbtsh3.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205799/24_i23bbv.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205798/23_strnoz.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205798/22_jifrxu.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205796/20_tldid0.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205796/2_te4ihl.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205795/19_ozqjif.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205794/18_a7vlfp.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205793/12_upktel.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205793/17_duhlot.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205791/14_clygy1.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205791/15_n8r4ul.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205790/13_tqadfz.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205790/10_o2mywg.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205789/1_osbyfj.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205789/11_ltskib.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205830/61_rav4t9.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205821/52_qixmoz.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205822/53_veuiqt.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205823/54_ulwnoq.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205824/55_w8gbla.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205825/56_mnyike.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205826/57_dwxe1h.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205827/58_gumlfz.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205828/59_xshy3t.svg', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205829/60_xzo6kh.svg', label: 'sticker' },
    //logo .png
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206375/52_tkkimk.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206324/51_wtxwbe.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206415/5_ohcgmq.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206414/42_fkwyvj.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206414/37_dlpndb.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206413/28_naiytr.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206412/9_zfgsag.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206411/8_nia5td.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206410/7_tyyaaj.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206376/6_k5oqdf.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206323/50_prmey0.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206322/49_nsvaag.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206321/48_dd3fey.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206318/47_jfqjp2.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206318/46_rjcqef.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206287/45_xjxefi.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206286/44_qxbiue.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206285/43_rpqnyl.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206255/41_dqxup5.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206254/40_hmmej6.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206253/4_vqjqeo.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206252/38_jwgdxd.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206251/39_y2zdjc.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206250/36_dqgjy1.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206250/35_ibo9pc.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206249/34_yzl5h0.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206247/33_audknl.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206247/32_grgryr.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206246/31_dbg7ae.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206245/30_ymx0lj.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206244/3_alv5qu.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206243/29_ub7lq6.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770206014/26_b3ly1e.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205995/27_pootia.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205994/25_x3z5st.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205993/24_yn3arf.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205932/23_jbhy6e.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205931/22_qzycxc.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205930/21_wu2kkv.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205929/20_q9my8l.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205928/2_p9hwtn.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205927/19_cy7lec.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205926/18_b9a0ow.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205926/17_bdycyx.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205925/16_odaqxt.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205873/10_e1sz2a.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205872/14_nrho5s.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205871/15_apylgt.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205871/13_uhdah3.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205870/12_asvrtm.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205869/11_qwufq7.png', label: 'sticker' },
    { name: 'sticker', path: 'https://res.cloudinary.com/dotom7ksq/image/upload/v1770205868/1_rosupl.png', label: 'sticker' },

  ];

  useEffect(() => {
    // Initialize all 4 canvases with A6 landscape ratio
    const newCanvases = [];

    for (let i = 0; i < 2; i++) {
      const canvas = new fabric.Canvas(`canvas-${i}`, {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        backgroundColor: '#ffffff',
        preserveObjectStacking: true
      });

      // Handle object selection
      canvas.on('selection:created', (e) => {
        if (i === currentSide) {
          setSelectedObject(e.selected[0]);
        }
      });

      canvas.on('selection:updated', (e) => {
        if (i === currentSide) {
          setSelectedObject(e.selected[0]);
        }
      });

      canvas.on('selection:cleared', () => {
        if (i === currentSide) {
          setSelectedObject(null);
        }
      });

      newCanvases[i] = canvas;
    }

    setCanvases(newCanvases);

    // Show only the first canvas initially
    for (let i = 1; i < 4; i++) {
      const canvasEl = document.getElementById(`canvas-${i}`);
      if (canvasEl) {
        canvasEl.parentElement.style.display = 'none';
      }
    }

    return () => {
      newCanvases.forEach(canvas => canvas.dispose());
    };
  }, []);

  useEffect(() => {
    // Switch visible canvas when currentSide changes
    for (let i = 0; i < 4; i++) {
      const canvasEl = document.getElementById(`canvas-${i}`);
      if (canvasEl) {
        canvasEl.parentElement.style.display = i === currentSide ? 'block' : 'none';
      }
    }
    setSelectedObject(canvases[currentSide]?.getActiveObject() || null);
  }, [currentSide, canvases]);

  const getCurrentCanvas = () => canvases[currentSide];

  const addText = () => {
    const canvas = getCurrentCanvas();
    if (!canvas) return;

    const text = new fabric.IText('Nhập văn bản', {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: '#000000',
      fontFamily: 'Arial'
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          fabric.Image.fromURL(event.target.result, (img) => {
            const canvas = getCurrentCanvas();
            if (!canvas) return;

            img.scale(0.5);
            img.set({
              left: 100,
              top: 100
            });

            canvas.add(img);
            canvas.setActiveObject(img);
            canvas.renderAll();
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const addRectangle = () => {
    const canvas = getCurrentCanvas();
    if (!canvas) return;

    const rect = new fabric.Rect({
      left: 150,
      top: 150,
      width: 120,
      height: 80,
      fill: '#4F46E5',
      stroke: '#312E81',
      strokeWidth: 2
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
    setShowShapesPanel(false);
  };

  const addCircle = () => {
    const canvas = getCurrentCanvas();
    if (!canvas) return;

    const circle = new fabric.Circle({
      left: 150,
      top: 150,
      radius: 50,
      fill: '#4F46E5',
      stroke: '#312E81',
      strokeWidth: 2
    });

    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
    setShowShapesPanel(false);
  };

  const addTriangle = () => {
    const canvas = getCurrentCanvas();
    if (!canvas) return;

    const triangle = new fabric.Triangle({
      left: 150,
      top: 150,
      width: 100,
      height: 100,
      fill: '#10B981',
      stroke: '#047857',
      strokeWidth: 2
    });

    canvas.add(triangle);
    canvas.setActiveObject(triangle);
    canvas.renderAll();
    setShowShapesPanel(false);
  };

  const addStar = () => {
    const canvas = getCurrentCanvas();
    if (!canvas) return;

    // Create a 5-pointed star using polygon
    const points = [];
    const outerRadius = 50;
    const innerRadius = 25;
    for (let i = 0; i < 10; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / 5) * i - Math.PI / 2;
      points.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      });
    }

    const star = new fabric.Polygon(points, {
      left: 150,
      top: 150,
      fill: '#F59E0B',
      stroke: '#D97706',
      strokeWidth: 2
    });

    canvas.add(star);
    canvas.setActiveObject(star);
    canvas.renderAll();
    setShowShapesPanel(false);
  };

  const addHexagon = () => {
    const canvas = getCurrentCanvas();
    if (!canvas) return;

    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      points.push({
        x: Math.cos(angle) * 50,
        y: Math.sin(angle) * 50
      });
    }

    const hexagon = new fabric.Polygon(points, {
      left: 150,
      top: 150,
      fill: '#8B5CF6',
      stroke: '#6D28D9',
      strokeWidth: 2
    });

    canvas.add(hexagon);
    canvas.setActiveObject(hexagon);
    canvas.renderAll();
    setShowShapesPanel(false);
  };

  const addPentagon = () => {
    const canvas = getCurrentCanvas();
    if (!canvas) return;

    const points = [];
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
      points.push({
        x: Math.cos(angle) * 50,
        y: Math.sin(angle) * 50
      });
    }

    const pentagon = new fabric.Polygon(points, {
      left: 150,
      top: 150,
      fill: '#EC4899',
      stroke: '#BE185D',
      strokeWidth: 2
    });

    canvas.add(pentagon);
    canvas.setActiveObject(pentagon);
    canvas.renderAll();
    setShowShapesPanel(false);
  };

  const addLine = () => {
    const canvas = getCurrentCanvas();
    if (!canvas) return;

    const line = new fabric.Line([50, 100, 200, 100], {
      left: 150,
      top: 150,
      stroke: '#374151',
      strokeWidth: 3
    });

    canvas.add(line);
    canvas.setActiveObject(line);
    canvas.renderAll();
    setShowShapesPanel(false);
  };
  //addsticker
  // const addSticker = (stickerPath) => {
  //   const canvas = getCurrentCanvas();
  //   if (!canvas) return;

  //   // Load SVG from URL
  //   fabric.loadSVGFromURL(stickerPath, (objects, options) => {
  //     const svg = fabric.util.groupSVGElements(objects, options);

  //     // Position at center
  //     svg.set({
  //       left: CANVAS_WIDTH / 2 - 50,
  //       top: CANVAS_HEIGHT / 2 - 50,
  //       scaleX: 1,
  //       scaleY: 1
  //     });

  //     canvas.add(svg);
  //     canvas.setActiveObject(svg);
  //     canvas.renderAll();
  //   });

  //   setShowStickersPanel(false);
  // };
  const addSticker = (stickerPath) => {
    const canvas = getCurrentCanvas();
    if (!canvas) return;

    // Check if the sticker is a PNG/image or SVG
    const isPNG = stickerPath.toLowerCase().includes('.png') ||
      stickerPath.toLowerCase().includes('.jpg') ||
      stickerPath.toLowerCase().includes('.jpeg') ||
      stickerPath.toLowerCase().includes('.gif') ||
      stickerPath.toLowerCase().includes('.webp');

    // Calculate target size (5 times smaller than canvas)
    const targetWidth = CANVAS_WIDTH / 5;
    const targetHeight = CANVAS_HEIGHT / 5;

    if (isPNG) {
      fabric.Image.fromURL(
        stickerPath,
        (img) => {
          const scale = Math.min(
            targetWidth / img.width,
            targetHeight / img.height
          );

          img.set({
            left: (CANVAS_WIDTH - img.width * scale) / 2,
            top: (CANVAS_HEIGHT - img.height * scale) / 2,
            scaleX: scale,
            scaleY: scale,
          });

          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
        },
        {
          crossOrigin: 'anonymous',
        }
      );

    } else {
      // Load as SVG
      fabric.loadSVGFromURL(stickerPath, (objects, options) => {
        if (!objects || objects.length === 0) {
          console.error('Failed to load SVG sticker');
          return;
        }

        const viewW = options.width || CANVAS_WIDTH;
        const viewH = options.height || CANVAS_HEIGHT;

        // 🔍 detect background giống Canva
        const isBackground = (obj) => {
          const w = obj.width || 0;
          const h = obj.height || 0;
          const areaRatio = (w * h) / (viewW * viewH);
          const fill = obj.fill?.toString().toLowerCase();

          // return (
          //   obj.type === 'rect' &&               // nền thường là rect
          //   areaRatio > 0.8 &&                   // gần full artboard
          //   (!obj.stroke || obj.strokeWidth === 0) &&
          //   (
          //     fill === '#000' ||
          //     fill === '#000000' ||
          //     fill === 'black' ||
          //     fill === '#fff' ||
          //     fill === '#ffffff' ||
          //     fill === 'white'
          //   )
          // );
        };

        // 🧼 clean SVG
        const cleanedObjects = objects.filter(obj => !isBackground(obj));

        const svg = fabric.util.groupSVGElements(cleanedObjects, options);

        // Calculate scale to fit within target size while maintaining aspect ratio
        const scaleX = targetWidth / svg.width;
        const scaleY = targetHeight / svg.height;
        const scale = Math.min(scaleX, scaleY);

        svg.set({
          left: (CANVAS_WIDTH - svg.width * scale) / 2,
          top: (CANVAS_HEIGHT - svg.height * scale) / 2,
          scaleX: scale,
          scaleY: scale,
        });

        canvas.add(svg);
        canvas.setActiveObject(svg);
        canvas.renderAll();
      }, null, { crossOrigin: 'anonymous' });
    }

    setShowStickersPanel(false);
  };


  //end add
  const deleteSelected = () => {
    const canvas = getCurrentCanvas();
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
      setSelectedObject(null);
    }
  };

  const changeBgColor = (color) => {
    const canvas = getCurrentCanvas();
    if (!canvas) return;

    canvas.setBackgroundColor(color, () => {
      canvas.renderAll();
    });
  };

  const updateObjectProperty = (property, value) => {
    const canvas = getCurrentCanvas();
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set(property, value);
      canvas.renderAll();
      // Force React to re-render by updating the selectedObject state
      setSelectedObject({ ...activeObject });
    }
  };

  const handleSubmit = () => {
    // Export all canvases as JSON
    const designs = canvases.map((canvas, index) => ({
      side: sideNames[index],
      data: canvas.toJSON()
    }));

    console.log('Card designs:', designs);
    alert('Thiệp của bạn đã được gửi thành công!');
  };

  const exportToPDF = async () => {
    try {
      // A6 landscape: 148mm x 105mm
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a6'
      });

      const pageWidth = pdf.internal.pageSize.getWidth(); // 148mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 105mm

      let isFirstPage = true;

      // Export all sides
      for (let i = 0; i < canvases.length; i++) {
        const canvas = canvases[i];
        if (canvas) {
          // Add new page for subsequent canvases
          if (!isFirstPage) {
            pdf.addPage('a6', 'landscape');
          }
          isFirstPage = false;

          // Deselect any selected objects to avoid selection handles in export
          canvas.discardActiveObject();
          canvas.renderAll();

          // Convert fabric canvas to image with high quality
          const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 3 // Higher resolution for better PDF quality
          });

          // Full page - no margins
          const imgWidth = pageWidth;
          const imgHeight = pageHeight;

          // Add image to PDF (full page, starting from 0,0)
          pdf.addImage(dataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        }
      }

      // Save PDF
      pdf.save('thiet-ke-thiep.pdf');
      alert('Xuất file PDF thành công!');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Có lỗi khi xuất file PDF: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Thiết kế thiệp</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportToPDF}
            className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Xuất file PDF
          </button>
          <button
            // onClick={handleSubmit}
            // href="https://fb.com/61586838331141"
            onClick={() => window.open('https://fb.com/61586838331141', '_blank')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <Facebook className="w-4 h-4" />
            Xuất file PDF rồi gửi cho chúng tôi
          </button>
        </div>
      </header>

      <div className="flex-1 flex relative">
        {/* Toolbar */}
        <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-2">
          <ToolButton
            icon={<Type className="w-5 h-5" />}
            label="Chữ"
            onClick={addText}
          />
          <ToolButton
            icon={<Image className="w-5 h-5" />}
            label="Ảnh"
            onClick={addImage}
          />
          <div className="relative">
            <ToolButton
              icon={<Shapes className="w-5 h-5" />}
              label="Hình dạng"
              onClick={() => {
                setShowShapesPanel(!showShapesPanel);
                setShowColorPicker(false);
                setShowStickersPanel(false);
              }}
              active={showShapesPanel}
            />
            {showShapesPanel && (
              <div className="absolute left-full ml-2 bg-white shadow-2xl rounded-xl p-4 z-20 w-72 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">Chọn hình dạng</h3>
                  <button
                    onClick={() => setShowShapesPanel(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <ShapeButton
                    icon={<Square className="w-8 h-8" />}
                    label="Vuông"
                    color="#4F46E5"
                    onClick={addRectangle}
                  />
                  <ShapeButton
                    icon={<Circle className="w-8 h-8" />}
                    label="Tròn"
                    color="#4F46E5"
                    onClick={addCircle}
                  />
                  <ShapeButton
                    icon={<Triangle className="w-8 h-8" />}
                    label="Tam giác"
                    color="#10B981"
                    onClick={addTriangle}
                  />
                  <ShapeButton
                    icon={<Star className="w-8 h-8" />}
                    label="Ngôi sao"
                    color="#F59E0B"
                    onClick={addStar}
                  />
                  <ShapeButton
                    icon={<Hexagon className="w-8 h-8" />}
                    label="Lục giác"
                    color="#8B5CF6"
                    onClick={addHexagon}
                  />
                  <ShapeButton
                    icon={<Pentagon className="w-8 h-8" />}
                    label="Ngũ giác"
                    color="#EC4899"
                    onClick={addPentagon}
                  />
                  <ShapeButton
                    icon={<Minus className="w-8 h-8" />}
                    label="Đường thẳng"
                    color="#374151"
                    onClick={addLine}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <ToolButton
              icon={<Smile className="w-5 h-5" />}
              label="Sticker"
              onClick={() => {
                setShowStickersPanel(!showStickersPanel);
                setShowShapesPanel(false);
                setShowColorPicker(false);
              }}
              active={showStickersPanel}
            />
            {showStickersPanel && (
              <div className="absolute left-full ml-2 bg-white shadow-2xl rounded-xl p-4 z-20 w-72 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">Chọn sticker</h3>
                  <button
                    onClick={() => setShowStickersPanel(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto pr-1">
                  {stickers.filter(sticker => sticker.path).map((sticker, index) => (
                    <button
                      key={`${sticker.name}-${index}`}
                      onClick={() => addSticker(sticker.path)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105 border border-transparent hover:border-gray-200 hover:shadow-sm"
                      title={sticker.label}
                    >
                      <LazyImage
                        src={sticker.path}
                        alt={sticker.label}
                        className="w-12 h-12 object-contain"
                      />
                      <span className="text-xs text-gray-600 font-medium">{sticker.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <ToolButton
              icon={<Palette className="w-5 h-5" />}
              label="Nền"
              onClick={() => {
                setShowColorPicker(!showColorPicker);
                setShowShapesPanel(false);
                setShowStickersPanel(false);
              }}
              active={showColorPicker}
            />
            {showColorPicker && (
              <div className="absolute left-full ml-2 bg-white shadow-lg rounded-lg p-3 z-10">
                <input
                  type="color"
                  defaultValue="#ffffff"
                  onChange={(e) => changeBgColor(e.target.value)}
                  className="w-24 h-24 cursor-pointer"
                />
              </div>
            )}
          </div>
          {selectedObject && (
            <ToolButton
              icon={<Trash2 className="w-5 h-5" />}
              label="Xóa"
              onClick={deleteSelected}
            />
          )}
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 flex flex-col">
          {/* Side Selector */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex gap-2">
            {sideNames.map((name, index) => (
              <button
                key={index}
                onClick={() => setCurrentSide(index)}
                className={`px-4 py-2 rounded-lg transition-colors ${currentSide === index
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Canvas Container */}
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
            <div ref={canvasContainerRef} className="relative">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="shadow-2xl">
                  <canvas id={`canvas-${index}`} />
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Properties Panel - Overlay */}
        {selectedObject && (
          <aside className="absolute right-0 top-0 bottom-0 w-72 bg-white border-l border-gray-200 p-4 overflow-y-auto shadow-xl z-10">
            <PropertiesPanel
              object={selectedObject}
              onUpdate={updateObjectProperty}
              onDelete={deleteSelected}
            />
          </aside>
        )}
      </div>
    </div>
  );
};

const ToolButton = ({ icon, label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${active ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'
      }`}
    title={label}
  >
    {icon}
    <span className="text-xs">{label}</span>
  </button>
);

const ShapeButton = ({ icon, label, color, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105 border border-transparent hover:border-gray-200 hover:shadow-sm"
    title={label}
  >
    <div style={{ color }} className="transition-transform duration-200">
      {icon}
    </div>
    <span className="text-xs text-gray-600 font-medium">{label}</span>
  </button>
);

// Lazy loading image component
const LazyImage = ({ src, alt, className }) => {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the image comes into view
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {isInView ? (
        <img
          src={src}
          alt={alt}
          className={className}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
        />
      ) : (
        <div className={`${className} bg-gray-100 animate-pulse`} />
      )}
    </div>
  );
};

const PropertiesPanel = ({ object, onUpdate, onDelete }) => {
  if (!object) return null;

  const isText = object.type === 'i-text' || object.type === 'text';
  const isImage = object.type === 'image';
  const isShape = object.type === 'rect' || object.type === 'circle';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Thuộc tính</h3>
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Position */}
      <div>
        <label className="block text-sm font-medium mb-1">Vị trí X</label>
        <input
          type="number"
          value={Math.round(object.left)}
          onChange={(e) => onUpdate('left', parseInt(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Vị trí Y</label>
        <input
          type="number"
          value={Math.round(object.top)}
          onChange={(e) => onUpdate('top', parseInt(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      {/* Text Properties */}
      {isText && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">Kích thước chữ</label>
            <input
              type="range"
              min="12"
              max="72"
              value={object.fontSize}
              onChange={(e) => onUpdate('fontSize', parseInt(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{object.fontSize}px</span>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Màu chữ</label>
            <input
              type="color"
              value={object.fill}
              onChange={(e) => onUpdate('fill', e.target.value)}
              className="w-full h-10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Font chữ</label>
            <select
              value={object.fontFamily}
              onChange={(e) => onUpdate('fontFamily', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
        </>
      )}

      {/* Shape Properties */}
      {isShape && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">Màu nền</label>
            <input
              type="color"
              value={object.fill}
              onChange={(e) => onUpdate('fill', e.target.value)}
              className="w-full h-10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Màu viền</label>
            <input
              type="color"
              value={object.stroke || '#000000'}
              onChange={(e) => onUpdate('stroke', e.target.value)}
              className="w-full h-10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Độ dày viền</label>
            <input
              type="range"
              min="0"
              max="10"
              value={object.strokeWidth || 0}
              onChange={(e) => onUpdate('strokeWidth', parseInt(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{object.strokeWidth || 0}px</span>
          </div>
        </>
      )}

      {/* Scale */}
      <div>
        <label className="block text-sm font-medium mb-1">Tỉ lệ</label>
        <input
          type="range"
          min="10"
          max="200"
          value={(object.scaleX || 1) * 100}
          onChange={(e) => {
            const scale = parseInt(e.target.value) / 100;
            onUpdate('scaleX', scale);
            onUpdate('scaleY', scale);
          }}
          className="w-full"
        />
        <span className="text-sm text-gray-600">{Math.round((object.scaleX || 1) * 100)}%</span>
      </div>

      {/* Rotation */}
      <div>
        <label className="block text-sm font-medium mb-1">Xoay</label>
        <input
          type="range"
          min="0"
          max="360"
          value={object.angle || 0}
          onChange={(e) => onUpdate('angle', parseInt(e.target.value))}
          className="w-full"
        />
        <span className="text-sm text-gray-600">{object.angle || 0}°</span>
      </div>

      {/* Opacity */}
      <div>
        <label className="block text-sm font-medium mb-1">Độ mờ</label>
        <input
          type="range"
          min="0"
          max="100"
          value={(object.opacity || 1) * 100}
          onChange={(e) => onUpdate('opacity', parseInt(e.target.value) / 100)}
          className="w-full"
        />
        <span className="text-sm text-gray-600">{Math.round((object.opacity || 1) * 100)}%</span>
      </div>
    </div>
  );
};

export default DesignCardPage;