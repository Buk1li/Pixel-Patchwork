import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export default function CanvasTooltip({placementUser, updatedAt}){
    const PixelTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
        ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#f5f5f9',
          color: 'rgba(0, 0, 0, 0.87)',
          maxWidth: 220,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
        },
    }));
    
    return (
        <PixelTooltip 
            title = {placementUser != null ? `Placed by: ${placementUser} on ${updatedAt}`:null}>
        </PixelTooltip>
    )
}