import { TreeView } from '../index.js'

const BranchNode = ({ value, label, children }) => (
  <TreeView.Branch data-value={value}>
    <TreeView.BranchControl>
      <TreeView.BranchTrigger>{'>'}</TreeView.BranchTrigger>
      <TreeView.BranchText>{label}</TreeView.BranchText>
    </TreeView.BranchControl>
    <TreeView.BranchContent>
      {children}
    </TreeView.BranchContent>
  </TreeView.Branch>
)

const LeafNode = ({ value, label }) => (
  <TreeView.Item data-value={value}>
    <TreeView.ItemText>{label}</TreeView.ItemText>
  </TreeView.Item>
)

export const ComponentUnderTest = (props) => (
  <TreeView.Root {...props}>
    <BranchNode value="parent" label="Parent">
      <LeafNode value="child" label="Child" />
    </BranchNode>
  </TreeView.Root>
)
