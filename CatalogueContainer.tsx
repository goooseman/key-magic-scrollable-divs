import React, { useMemo, useState } from "react";
import Catalogue from "./Catalogue";

export interface CatalogueItem {
  id: number;
  text: string;
  href?: string;
  items?: CatalogueItem[];
}

interface CatalogueContainerProps {
  catalogue: CatalogueItem[];
}

const CatalogueContainer: React.FC<CatalogueContainerProps> = ({ catalogue }) => {
  const [activeIds, setActiveIds] = useState<number[]>([]);
  const handleColumnItemClick = (columnIndex: number) => (itemId: number) => {
    setActiveIds((a) => {
      a[columnIndex] = itemId;
      return [...a].slice(0, columnIndex + 1);
    });
  };
  const columns = useMemo(() => {
    return [
      {
        items: catalogue,
        onClick: handleColumnItemClick(0),
        activeId: activeIds[0],
      },
      {
        items: catalogue[activeIds[0]]?.items || [],
        onClick: handleColumnItemClick(1),
        activeId: activeIds[1],
      },
      {
        items: catalogue[activeIds[0]]?.items?.[activeIds[1]]?.items || [],
        onClick: handleColumnItemClick(2),
        activeId: activeIds[2],
      },
    ];
  }, [activeIds]);
  
  return <Catalogue columns={columns} />;
};

export default CatalogueContainer;
