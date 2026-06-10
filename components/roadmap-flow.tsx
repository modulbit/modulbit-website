"use client";

import React, { useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "reactflow";

import "reactflow/dist/style.css";

import type { Dictionary } from "@/lib/dictionaries";

type RoadmapLabels = Dictionary["roadmap"]["nodes"];

type NodeId =
  | "start"
  | "website"
  | "MVP"
  | "User testing"
  | "Product focus"
  | "Monetization"
  | "Partnerships"
  | "Growth";

interface CardData {
  title: string;
  text: string;
}

// Tady si nastavíš rozestupy (v px) – hlavní věc, co chceš
const GRID_X = 340;
const GRID_Y = 170;

const edgeStyle = { stroke: "rgb(0 255 157 / 0.45)", strokeWidth: 2.5 };
const arrowMarker = {
  type: MarkerType.ArrowClosed,
  width: 18,
  height: 18,
  color: "rgba(0,255,157,0.85)",
};

function cardNode(
  id: NodeId,
  col: number,
  row: number,
  title: string,
  text: string,
  sourcePosition: Position = Position.Right,
  targetPosition: Position = Position.Left
): Node {
  return {
    id,
    position: { x: col * GRID_X, y: row * GRID_Y },
    data: { title, text },
    sourcePosition,
    targetPosition,
    type: "card",
  };
}

const nodeTypes = {
  card: ({ data }: NodeProps<CardData>) => (
    <div className="relative w-[280px] rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm overflow-visible">
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-0 !bg-transparent opacity-0"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-0 !bg-transparent opacity-0"
      />
      <div className="text-xs font-bold uppercase tracking-widest text-accent">
        {data.title}
      </div>
      <div className="mt-2 text-gray-300 font-inter leading-relaxed">
        {data.text}
      </div>
    </div>
  ),
};

export default function RoadmapFlow({ labels }: { labels: RoadmapLabels }) {
  const nodes: Node[] = useMemo(
    () => [
      cardNode(
        "start",
        0,
        0,
        labels.start.title,
        labels.start.text,
        Position.Right,
        Position.Bottom
      ),
      cardNode(
        "website",
        1,
        0,
        labels.website.title,
        labels.website.text,
        Position.Right,
        Position.Left
      ),
      cardNode(
        "MVP",
        2,
        1,
        labels.mvp.title,
        labels.mvp.text,
        Position.Right,
        Position.Top
      ),
      cardNode(
        "User testing",
        3,
        1,
        labels.testing.title,
        labels.testing.text,
        Position.Left,
        Position.Left
      ),
      cardNode(
        "Product focus",
        3,
        2,
        labels.focus.title,
        labels.focus.text,
        Position.Left,
        Position.Left
      ),
      cardNode(
        "Monetization",
        4,
        3,
        labels.monetization.title,
        labels.monetization.text,
        Position.Left,
        Position.Left
      ),
      cardNode(
        "Partnerships",
        3,
        3,
        labels.onboarding.title,
        labels.onboarding.text,
        Position.Right,
        Position.Top
      ),
      cardNode(
        "Growth",
        5,
        3,
        labels.growth.title,
        labels.growth.text,
        Position.Left,
        Position.Left
      ),
    ],
    [labels]
  );

  const edges: Edge[] = useMemo(
    () => [
      {
        id: "e-start-website",
        source: "start",
        target: "website",
        type: "smoothstep",
        markerEnd: arrowMarker,
        style: edgeStyle,
      },
      {
        id: "e-website-mvp",
        source: "website",
        target: "MVP",
        type: "smoothstep",
        markerEnd: arrowMarker,
        style: edgeStyle,
      },
      {
        id: "e-mvp-testing",
        source: "MVP",
        target: "User testing",
        type: "smoothstep",
        markerEnd: arrowMarker,
        style: edgeStyle,
      },
      {
        id: "e-testing-focus",
        source: "User testing",
        target: "Product focus",
        type: "smoothstep",
        markerEnd: arrowMarker,
        style: edgeStyle,
      },
      {
        id: "e-focus-monetization",
        source: "Product focus",
        target: "Partnerships",
        type: "smoothstep",
        markerEnd: arrowMarker,
        style: edgeStyle,
      },
      {
        id: "e-partnerships-partnerships",
        source: "Partnerships",
        target: "Monetization",
        type: "smoothstep",
        markerEnd: arrowMarker,
        style: edgeStyle,
      },

        {
        id: "e-partnerships-growth",
        source: "Monetization",
        target: "Growth",
        type: "smoothstep",
        markerEnd: arrowMarker,
        style: edgeStyle,
      },
    ],
    []
  );

  return (
    <div className="h-[560px] w-full rounded-3xl bg-black/10 border border-white/10 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
        proOptions={{ hideAttribution: true }}
        snapToGrid
        snapGrid={[20, 20]}
      >
        <Background gap={24} size={1} color="rgba(255,255,255,0.06)" />
        {/* <MiniMap pannable zoomable /> */}
        <Controls />
      </ReactFlow>
    </div>
  );
}