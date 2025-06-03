import { ReactNode, useCallback, useState, type ReactElement } from 'react';
import type { PortalProps } from '../layout/main/parts';

type DashboardPortal = ReactElement<PortalProps> | ReactElement<PortalProps>[];

export function useDashboardPortal( children: ReactNode )
{
  let portalNames: string[] = [];

  let dashboardPortals = children as DashboardPortal;

  if (Array.isArray(dashboardPortals)) {
    dashboardPortals = dashboardPortals.filter(Boolean);
    portalNames = dashboardPortals.map(p => p.props.name);
  } else portalNames.push((children as ReactElement<PortalProps>).props.name);

  const [currentPortal, setCurrentPortal] = useState<string | undefined>(portalNames[0]);

  //effect to monitor action queue

  if (!currentPortal) throw new Error('Main component must have at least one portal child');

  const handlePortalChange = useCallback((newPortal: string) => setCurrentPortal(newPortal), []);

  const renderPortal = () =>
    Array.isArray(dashboardPortals)
      ? dashboardPortals.filter(e => e.props.name === currentPortal)
      : dashboardPortals;
  
  return {
    renderPortal,
    handlePortalChange,
    currentPortal,
    portalNames
  }
}