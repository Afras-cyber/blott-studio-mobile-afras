import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import Notification from "../../app/notification";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("Notification Component", () => {
  it("renders correctly", () => {
    const { getByText, getByRole } = render(<Notification />);

    expect(getByText("Get the most out of Blott ✅")).toBeTruthy();
    expect(
      getByText(
        "Allow notifications to stay in the loop with your payments, requests, and groups."
      )
    ).toBeTruthy();
    expect(getByRole("button")).toBeTruthy();
  });

  it("shows alert when 'Continue' button is pressed", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");

    const { getByText } = render(<Notification />);
    fireEvent.press(getByText("Continue"));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        `“Blott” Would Like to Send You Notifications`,
        "Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.",
        expect.any(Array)
      );
    });

    alertSpy.mockRestore(); // Clean up after the test
  });

  it("navigates to /dashboard on alert button press", async () => {
    const router = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(router);

    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(
      (title, message, buttons) => {
        if (buttons) {
          // Simulate pressing the "Allow" button
          buttons[1].onPress?.();
        }
      }
    );

    const { getByText } = render(<Notification />);
    fireEvent.press(getByText("Continue"));

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/dashboard");
    });

    alertSpy.mockRestore();
  });
});
