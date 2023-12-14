import React, { Component, ReactNode, ErrorInfo } from "react";
import ErrorView from "./View";
import Logger, { writeEmergencyLog } from "../../helpers/Logger";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  file_path: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, file_path: "" };
  }

  async componentDidCatch(error: Error, errorInfo: ErrorInfo): Promise<void> {
      Logger.error("ErrorBoundary", error);
      let path = await writeEmergencyLog(error, errorInfo);
      this.setState({ hasError: true, error: error, errorInfo: errorInfo, file_path: path });
  }

  render() {
    if (this.state.hasError) {
      // Render an error message or fallback UI
      return <ErrorView error={this.state.error!} errorInfo={this.state.errorInfo!} file_path={this.state.file_path} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
