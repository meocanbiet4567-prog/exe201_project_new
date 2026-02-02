import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Type, Image, Square, Circle, Trash2, Send, Palette, Download, FileText, Triangle, Star, Hexagon, Pentagon, Minus, Shapes, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Fabric.js will be loaded from CDN
const { fabric } = window;

const DesignCardPage = () => {
  const [currentSide, setCurrentSide] = useState(0);
  const [canvases, setCanvases] = useState([null, null, null, null]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showShapesPanel, setShowShapesPanel] = useState(false);
  const canvasContainerRef = useRef(null);
  const sideNames = ['Mặt trước', 'Mặt sau'];

  useEffect(() => {
    // Initialize all 4 canvases
    const newCanvases = [];
    for (let i = 0; i < 2; i++) {
      const canvas = new fabric.Canvas(`canvas-${i}`, {
        width: 400,
        height: 500,
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
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a5'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let currentY = 10;

      // Export all 4 sides
      for (let i = 0; i < canvases.length; i++) {
        const canvas = canvases[i];
        if (canvas) {
          // Convert fabric canvas to image
          const dataURL = canvas.toDataURL('image/png');

          // Add title for each side
          pdf.setFontSize(12);
          pdf.text(sideNames[i], 10, currentY);

          currentY += 5;

          // Add image to PDF
          const imgWidth = pageWidth - 20;
          const imgHeight = (canvas.height / canvas.width) * imgWidth;

          pdf.addImage(dataURL, 'PNG', 10, currentY, imgWidth, imgHeight);
          currentY += imgHeight + 15;

          // Add new page if needed (except for last side)
          if (i < canvases.length - 1 && currentY > pageHeight - 50) {
            pdf.addPage();
            currentY = 10;
          }
        }
      }

      // Save PDF
      pdf.save('thiet-ke-thiep.pdf');
      alert('Xuất file PDF thành công!');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Có lỗi khi xuất file PDF');
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
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            Gửi thiệp
          </button>
        </div>
      </header>

      <div className="flex-1 flex">
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
              icon={<Palette className="w-5 h-5" />}
              label="Nền"
              onClick={() => {
                setShowColorPicker(!showColorPicker);
                setShowShapesPanel(false);
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

        {/* Properties Panel */}
        {selectedObject && (
          <aside className="w-72 bg-white border-l border-gray-200 p-4 overflow-y-auto">
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