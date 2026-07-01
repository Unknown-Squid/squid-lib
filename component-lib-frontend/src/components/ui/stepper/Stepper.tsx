import type { ReactNode } from "react";

import { cn } from "@/utils";

export type StepperStep = {
  id: string;
  label: ReactNode;
  description?: ReactNode;
};

export type StepperProps = {
  steps: StepperStep[];
  currentIndex: number;
  onStepClick?: (index: number) => void;
  className?: string;
  "aria-label"?: string;
};

export function Stepper({
  steps,
  currentIndex,
  onStepClick,
  className,
  "aria-label": ariaLabel = "Form progress",
}: StepperProps) {
  return (
    <nav className={cn("ui-stepper", className)} aria-label={ariaLabel}>
      <ol className="ui-stepper__list">
        {steps.map((step, index) => {
          const complete = index < currentIndex;
          const current = index === currentIndex;
          const clickable =
            Boolean(onStepClick) && index <= currentIndex;

          return (
            <li key={step.id} className="ui-stepper__item">
              <div className="ui-stepper__segment">
                <button
                  type="button"
                  disabled={!clickable}
                  className={cn(
                    "ui-stepper__button",
                    clickable && "ui-stepper__button--clickable",
                    current && "ui-stepper__button--current",
                    complete && "ui-stepper__button--complete",
                  )}
                  aria-current={current ? "step" : undefined}
                  onClick={() => clickable && onStepClick?.(index)}
                >
                  <span className="ui-stepper__bullet" aria-hidden>
                    {complete ? "✓" : index + 1}
                  </span>
                  <span className="ui-stepper__label">
                    <span className="ui-stepper__label-text">{step.label}</span>
                  </span>
                </button>
                <span
                  className={cn(
                    "ui-stepper__connector",
                    complete && "ui-stepper__connector--complete",
                  )}
                  aria-hidden
                />
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
