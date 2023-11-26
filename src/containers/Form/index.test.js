import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      const submitButton = await screen.findByRole('button', { name: /Envoyer/i });
      
      fireEvent.click(submitButton);

      await waitFor(() => screen.getByText("En cours"));
      await waitFor(() => screen.getByText("Envoyer"));
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
