"use client";
import React, { useState } from "react";
import Image from 'next/image';

interface ProgressButtonProps {
  label: string;
  isActive?: boolean;
  isCompleted?: boolean;
  onClick: () => void;
  icon?: string;
}

export default function ProgressButton({ label, isActive, isCompleted, onClick, icon }: ProgressButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseStyles: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: "8px",
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: isCompleted ? 'transparent' : "#d1d5db",
    backgroundColor: isHovered && !isCompleted ? "#f8fafc" : (isCompleted ? "#f8fafc" : "transparent"),
    color: "#334155",
    fontWeight: 500,
    fontSize: "15px",
    cursor: "pointer",
    letterSpacing: '0.5px',
    transition: "all 0.2s ease-in-out",
    display: "flex",
    alignItems: "center",
  };

  if (isActive) {
    baseStyles.borderColor = "#2563eb";
    baseStyles.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.2)";
  }

  return (
    <button
      style={baseStyles}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
      {isCompleted && <span style={{ color: "#10b981" }}>✓</span>}
    </button>
  );
} 