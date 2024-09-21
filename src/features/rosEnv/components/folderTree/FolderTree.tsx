/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconFolder, IconFolderOpen } from "@tabler/icons-react";
import { Group, RenderTreeNodePayload, Tree } from "@mantine/core";
import { CssIcon, NpmIcon, TypeScriptCircleIcon } from "@mantinex/dev-icons";
import classes from "./css/FolderTree.module.css";
import { folderTree } from "./data/tree";

interface FileIconProps {
  name: string;
  isFolder: boolean;
  expanded: boolean;
}

function FileIcon({ name, isFolder, expanded }: FileIconProps) {
  if (name.endsWith("package.json")) {
    return <NpmIcon size={14} />;
  }

  if (
    name.endsWith(".ts") ||
    name.endsWith(".tsx") ||
    name.endsWith("tsconfig.json")
  ) {
    return <TypeScriptCircleIcon size={14} />;
  }

  if (name.endsWith(".css")) {
    return <CssIcon size={14} />;
  }

  if (isFolder) {
    return expanded ? (
      <IconFolderOpen
        color="var(--mantine-color-yellow-9)"
        size={14}
        stroke={2.5}
      />
    ) : (
      <IconFolder
        color="var(--mantine-color-yellow-9)"
        size={14}
        stroke={2.5}
      />
    );
  }

  return null;
}

const FolderTree = () => {
  function Leaf({
    node,
    expanded,
    hasChildren,
    elementProps,
  }: RenderTreeNodePayload) {
    return (
      <Group gap={5} {...elementProps}>
        <FileIcon
          name={node.value}
          isFolder={hasChildren}
          expanded={expanded}
        />
        <span>{node.label}</span>
      </Group>
    );
  }

  return (
    <Tree
      classNames={classes}
      selectOnClick
      clearSelectionOnOutsideClick
      data={folderTree}
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
};

export default FolderTree;
