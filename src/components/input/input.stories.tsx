import type { Meta, StoryObj } from "@storybook/react";
import { InputNerux } from "./index";

const meta: Meta<typeof InputNerux> = {
  title: "Design System/Input",
  component: InputNerux,
} satisfies Meta <typeof InputNerux>;

export default meta;

type Story = StoryObj<typeof InputNerux>;

export const Default: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      <InputNerux name="Email" placeholder="Ingrese el correo electronico"></InputNerux>
      <InputNerux name="Email" placeholder="Ingrese el correo electronico" error="Correo incorrecto" required></InputNerux>
      <InputNerux name="Password" placeholder="Ingrese el correo electronico" type="password"></InputNerux>
      <InputNerux name="StarIcon" placeholder="Ingrese el correo electronico" startIcon="IconCircle"></InputNerux>
      <InputNerux name="EndIcon" placeholder="Ingrese el correo electronico" endIcon="IconAddressBook"></InputNerux>
      <InputNerux name="Disable" placeholder="Ingrese el correo electronico" disabled></InputNerux>
    </div>
  ),
}

// export const Error: Story = {
//   args: {
//     label: "Email",
//     isDisabled: false,
//     isRequired: true,
//     placeholder: "Ingrese su email",
//     error: "Correo incorrecto"
//   }
// }

// export const Default: Story = {
//   args: {
//     label: "Email",
//     isDisabled: false,
//     isRequired: false,
//     placeholder: "Ingrese su email",
//   }
// }

// export const Disabled: Story = {
//   args: {
//     label: "Email",
//     isDisabled: true,
//     isRequired: true,
//     placeholder: "Ingrese su email",
//   }
// }

// export const Password: Story = {
//   args: {
//     label: "Contraseña",
//     type: "password",
//     placeholder: "Ingrese su contraseña",
//     required: false
//   }
// }