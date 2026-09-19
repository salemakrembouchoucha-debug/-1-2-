import React from 'react';
import {
  DaltonDiagram,
  ThomsonDiagram,
  RutherfordDiagram,
  BohrDiagram,
  LithiumAtomDiagram,
  BoronAtomDiagram,
  AluminiumAtomDiagram,
  AmmoniaBallAndStick,
  WaterSpaceFilling,
  AmmoniaSpaceFilling,
  HofmannVoltameterDiagram,
  BunsenHeatingDiagram,
  BananaColorChangeDiagram,
  MagnesiumBurningDiagram,
} from './Diagrams';

interface DiagramRendererProps {
  type?: string;
  size?: number;
  className?: string;
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({ type, size, className = '' }) => {
  if (!type) return null;

  switch (type) {
    case 'dalton':
      return <DaltonDiagram size={size || 130} className={className} />;
    case 'thomson':
      return <ThomsonDiagram size={size || 130} className={className} />;
    case 'rutherford':
      return <RutherfordDiagram size={size || 140} className={className} showLabels={true} />;
    case 'bohr':
      return <BohrDiagram size={size || 130} className={className} />;
    case 'lithium':
      return <LithiumAtomDiagram size={size || 160} className={className} withLabels={true} />;
    case 'boron':
      return <BoronAtomDiagram size={size || 145} className={className} />;
    case 'aluminium':
      return <AluminiumAtomDiagram size={size || 145} className={className} />;
    case 'ammonia_ball_stick':
      return <AmmoniaBallAndStick size={size || 130} className={className} />;
    case 'water_space_filling':
      return <WaterSpaceFilling size={size || 130} className={className} />;
    case 'ammonia_space_filling':
      return <AmmoniaSpaceFilling size={size || 130} className={className} />;
    case 'hofmann':
      return <HofmannVoltameterDiagram size={size || 155} className={className} />;
    case 'bunsen_heating':
      return <BunsenHeatingDiagram size={size || 165} className={className} />;
    case 'banana_color':
      return <BananaColorChangeDiagram size={size || 135} className={className} />;
    case 'magnesium_flame':
      return <MagnesiumBurningDiagram size={size || 135} className={className} />;
    default:
      return null;
  }
};
