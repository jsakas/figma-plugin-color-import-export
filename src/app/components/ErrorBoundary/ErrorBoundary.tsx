import { Component, ErrorInfo, ReactNode } from 'react';
import React from 'react';
import { ErrorComponent } from './ErrorComponent';

export type ErrorBoundaryProps = {
  children?: ReactNode;
  onError?: (error?: Error) => void;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);

    if (typeof this.props.onError === 'function') {
      try {
        this.props.onError(error);
      } catch (e) {
        console.error(e);
      }
    }

    this.setState({ error, errorInfo });
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorComponent error={this.state.error} errorInfo={this.state.errorInfo} />;
    }

    return this.props.children;
  }
}
