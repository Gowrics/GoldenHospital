import React, { useEffect, useState } from 'react';

// Color map representing pain scale levels 0 to 10
const getPainColor = (level) => {
  if (!level || level === 0) return '#e0e0e0';
  if (level <= 3) return '#ffeb3b';            // Mild (Yellow)
  if (level <= 7) return '#ff9800';            // Moderate (Orange)
  return '#f44336';                            // Severe (Red)
};

// Map of standard emojis representing common medical treatment tracks
const treatmentIcons = {
  Ice: '❄️',
  Heat: '🔥',
  Bandage: '🩹',
  Medication: '💊',
  Massage: '💆',
  None: ''
};

export default function AdvancedPainTracker() {
  // Initialization data covering both front and back structural paths
  const bodyPartsList = [
    'head-front', 'neck-front', 'chest-front', 'abdomen-front', 'leftArm-front', 'rightArm-front', 'pelvis-front', 'leftLeg-front', 'rightLeg-front',
    'head-back', 'neck-back', 'chest-back', 'abdomen-back', 'leftArm-back', 'rightArm-back', 'pelvis-back', 'leftLeg-back', 'rightLeg-back'
    ];const defaultBodyData = bodyPartsList.reduce((acc, part) => {
  acc[part] = {
    pain: 0,
    treatment: "None"
  };
  return acc;
}, {});

const [bodyData, setBodyData] = useState(() => {
  const savedData = localStorage.getItem("physioBodyData");

  if (savedData) {
    return {
      ...defaultBodyData,
      ...JSON.parse(savedData)
    };
  }

  return defaultBodyData;
});

  const [selectedPart, setSelectedPart] = useState('head-front');
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, partName: '' });

  const handlePainChange = (part, level) => {
    setBodyData(prev => ({
      ...prev,
      [part]: { ...prev[part], pain: parseInt(level, 10) }
    }));
  };

  const handleTreatmentChange = (part, value) => {
    setBodyData(prev => ({
      ...prev,
      [part]: { ...prev[part], treatment: value }
    }));
  };

  // Tooltip tracking logic configuration 
  const handleMouseMove = (e, part) => {
    // Relative tracking wrapper calculation
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - rect.left + 15,
      y: e.clientY - rect.top + 15,
      partName: part
    });
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  // Helper targeting function setting unique inline configuration styles
  const getPartProps = (partId) => ({
    id: partId,
    fill: getPainColor(bodyData[partId].pain),
    stroke: selectedPart === partId ? '#000000' : '#333333',
    strokeWidth: selectedPart === partId ? 3 : 1.5,
    onClick: () => setSelectedPart(partId),
    onMouseMove: (e) => handleMouseMove(e, partId),
    onMouseLeave: handleMouseLeave,
    style: { cursor: 'pointer', transition: 'fill 0.15s ease' }
  });

useEffect(() => {
  if (Object.keys(bodyData).length > 0) {
    localStorage.setItem(
      "physioBodyData",
      JSON.stringify(bodyData)
    );
  }
}, [bodyData]);
const clearAssessment = () => {
  const resetData = bodyPartsList.reduce((acc, part) => {
    acc[part] = {
      pain: 0,
      treatment: "None"
    };
    return acc;
  }, {});

  setBodyData(resetData);
  localStorage.removeItem("physioBodyData");
};
  return (
    <div style={{ display: 'flex', gap: '30px', fontFamily: 'system-ui, sans-serif', padding: '20px', position: 'relative' }}>
      
      {/* Visual Workspace Canvas container */}
      <div style={{ position: 'relative', width: '440px', height: '500px', background: '#fcfcfc', border: '1px solid #ddd', borderRadius: '8px' }}>
        
        <svg xmlns="http://w3.org" viewBox="0 0 440 500" width="100%" height="100%">
          {/* FRONT PERSPECTIVE MATRIX */}
          <g id="front-view">
            <text x="100" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#666">FRONT VIEW</text>
            <circle cx="100" cy="60" r="25" {...getPartProps('head-front')} />
            <rect x="93" y="85" width="14" height="15" {...getPartProps('neck-front')} />
            <path d="M 65 100 L 135 100 L 130 170 L 70 170 Z" {...getPartProps('chest-front')} />
            <path d="M 70 170 L 130 170 L 125 240 L 75 240 Z" {...getPartProps('abdomen-front')} />
            <path d="M 65 100 L 45 160 L 35 230 L 45 230 L 55 170 L 65 120 Z" {...getPartProps('leftArm-front')} />
            <path d="M 135 100 L 155 160 L 165 230 L 155 230 L 145 170 L 135 120 Z" {...getPartProps('rightArm-front')} />
            <path d="M 75 240 L 125 240 L 130 270 L 70 270 Z" {...getPartProps('pelvis-front')} />
            <path d="M 70 270 L 75 370 L 80 470 L 65 470 L 60 370 L 70 270 Z" {...getPartProps('leftLeg-front')} />
            <path d="M 130 270 L 125 370 L 120 470 L 135 470 L 140 370 L 130 270 Z" {...getPartProps('rightLeg-front')} />
            
            {/* Dynamic Treatment Badges Front Overlay */}
            {bodyData['head-front'].treatment !== 'None' && <text x="100" y="65" fontSize="14" textAnchor="middle pointer-events-none">{treatmentIcons[bodyData['head-front'].treatment]}</text>}
            {bodyData['chest-front'].treatment !== 'None' && <text x="100" y="140" fontSize="16" textAnchor="middle">{treatmentIcons[bodyData['chest-front'].treatment]}</text>}
            {bodyData['abdomen-front'].treatment !== 'None' && <text x="100" y="210" fontSize="16" textAnchor="middle">{treatmentIcons[bodyData['abdomen-front'].treatment]}</text>}
          </g>

          {/* BACK PERSPECTIVE MATRIX */}
          <g id="back-view" transform="translate(240, 0)">
            <text x="100" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#666">BACK VIEW</text>
            <circle cx="100" cy="60" r="25" {...getPartProps('head-back')} />
            <rect x="93" y="85" width="14" height="15" {...getPartProps('neck-back')} />
            <path d="M 65 100 L 135 100 L 130 170 L 70 170 Z" {...getPartProps('chest-back')} />
            <path d="M 70 170 L 130 170 L 125 240 L 75 240 Z" {...getPartProps('abdomen-back')} />
            <path d="M 135 100 L 155 160 L 165 230 L 155 230 L 145 170 L 135 120 Z" {...getPartProps('leftArm-back')} />
            <path d="M 65 100 L 45 160 L 35 230 L 45 230 L 55 170 L 65 120 Z" {...getPartProps('rightArm-back')} />
            <path d="M 75 240 L 125 240 L 130 270 L 70 270 Z" {...getPartProps('pelvis-back')} />
            <path d="M 130 270 L 125 370 L 120 470 L 135 470 L 140 370 L 130 270 Z" {...getPartProps('leftLeg-back')} />
            <path d="M 70 270 L 75 370 L 80 470 L 65 470 L 60 370 L 70 270 Z" {...getPartProps('rightLeg-back')} />

            {/* Dynamic Treatment Badges Back Overlay */}
            {bodyData['head-back'].treatment !== 'None' && <text x="100" y="65" fontSize="14" textAnchor="middle">{treatmentIcons[bodyData['head-back'].treatment]}</text>}
            {bodyData['chest-back'].treatment !== 'None' && <text x="100" y="140" fontSize="16" textAnchor="middle">{treatmentIcons[bodyData['chest-back'].treatment]}</text>}
            {bodyData['abdomen-back'].treatment !== 'None' && <text x="100" y="210" fontSize="16" textAnchor="middle">{treatmentIcons[bodyData['abdomen-back'].treatment]}</text>}
          </g>
        </svg>

        {/* Dynamic Context Tooltip Portal Component Element */}
        {tooltip.visible && (
          <div style={{
            position: 'absolute', top: tooltip.y, left: tooltip.x,
            backgroundColor: 'rgba(50, 50, 50, 0.95)', color: '#fff',
            padding: '8px 12px', borderRadius: '4px', fontSize: '12px',
            pointerEvents: 'none', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}>
            <b style={{ textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              {tooltip.partName.replace('-', ' ')}
            </b>
            <div>Pain Scale: {bodyData[tooltip.partName].pain}/10</div>
            <div>Rx Plan: {bodyData[tooltip.partName].treatment}</div>
          </div>
        )}
      </div>

      {/* Controller Configuration Console Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '350px' }}>
        <h3>Control Console</h3>
        <p>Active Target Frame: <strong style={{ textTransform: 'uppercase', color: '#0066cc' }}>{selectedPart.replace('-', ' ')}</strong></p>

        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px' }}>Pain Level Index: {bodyData[selectedPart].pain}</label>
          <input type="range" min="0" max="10" value={bodyData[selectedPart].pain} onChange={(e) => handlePainChange(selectedPart, e.target.value)} style={{ width: '100%' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px' }}>Therapy Selection:</label>
          <select value={bodyData[selectedPart].treatment} onChange={(e) => handleTreatmentChange(selectedPart, e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
            {Object.keys(treatmentIcons).map(tKey => (
              <option key={tKey} value={tKey}>{tKey} {treatmentIcons[tKey]}</option>
            ))}
          </select>
        </div>

        <div style={{ background: '#f0f0f0', padding: '12px', borderRadius: '6px', fontSize: '13px' }}>
          <h4>Quick Status Board:</h4>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {bodyPartsList.filter(p => bodyData[p].pain > 0 || bodyData[p].treatment !== 'None').map(p => (
              <li key={p} style={{ marginBottom: '4px' }}>
                <span style={{ textTransform: 'capitalize' }}>{p.replace('-', ' ')}</span>: <b>{bodyData[p].pain}/10</b> | {bodyData[p].treatment}
              </li>
            ))}
          </ul>
        </div>
        <button
  onClick={clearAssessment}
  style={{
    padding: "10px",
    background: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }}
>
  Clear Assessment
</button>
      </div>

    </div>
  );
}
