import { Table, type TableProps } from "@heroui/react";

export function TableNerux({children}: TableProps) {
  return (
    <Table>
     <Table.ScrollContainer>
        <Table.Content aria-label="Team members">
         {children}
          <Table.Body>
            <Table.Row>
              <Table.Cell>Kate Moore</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>kate@acme.com</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>John Smith</Table.Cell>
              <Table.Cell>CTO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>john@acme.com</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Sara Johnson</Table.Cell>
              <Table.Cell>CMO</Table.Cell>
              <Table.Cell>On Leave</Table.Cell>
              <Table.Cell>sara@acme.com</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Michael Brown</Table.Cell>
              <Table.Cell>CFO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>michael@acme.com</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer>{/* Optional footer content */}</Table.Footer>
    </Table>
  );
}
