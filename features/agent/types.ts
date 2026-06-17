export interface AgentInsight {
  title: string;

  message: string;

  type: "info" | "success" | "warning";

  createdAt: string;
}
