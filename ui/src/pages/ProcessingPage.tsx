import { useEffect, useState } from "react";

import {
  ProcessingStatus,
} from "@/components/processing/ProcessingStatus";

import type {
  ProcessingStageState,
} from "@/components/processing/ProcessingStage";

type ProcessingPageProps = {
  file: File;
  onComplete?: () => void;
};

type Stage = {
  id: string;
  label: string;
  state: ProcessingStageState;
};

const initialStages: Stage[] = [
  {
    id: "prepare",
    label: "Preparing document",
    state: "active",
  },
  {
    id: "model",
    label: "Loading document model",
    state: "pending",
  },
  {
    id: "text",
    label: "Extracting text",
    state: "pending",
  },
  {
    id: "tables",
    label: "Detecting tables",
    state: "pending",
  },
  {
    id: "metadata",
    label: "Reading metadata",
    state: "pending",
  },
  {
    id: "results",
    label: "Preparing results",
    state: "pending",
  },
];

export function ProcessingPage({
  file,
  onComplete,
}: ProcessingPageProps) {
  const [stages, setStages] =
    useState<Stage[]>(initialStages);

  useEffect(() => {
    let currentIndex = 0;

    const interval = window.setInterval(() => {
      setStages((currentStages) => {
        const nextStages = currentStages.map(
          (stage, index) => {
            if (index < currentIndex) {
              return {
                ...stage,
                state: "complete" as const,
              };
            }

            if (index === currentIndex) {
              return {
                ...stage,
                state: "complete" as const,
              };
            }

            if (index === currentIndex + 1) {
              return {
                ...stage,
                state: "active" as const,
              };
            }

            return {
              ...stage,
              state: "pending" as const,
            };
          }
        );

        return nextStages;
      });

      currentIndex += 1;

      if (currentIndex >= initialStages.length) {
        window.clearInterval(interval);

        window.setTimeout(() => {
          onComplete?.();
        }, 700);
      }
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-8 py-12">
      <ProcessingStatus
        fileName={file.name}
        stages={stages}
      />
    </div>
  );
}