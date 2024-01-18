import { render, screen } from "@testing-library/react";

import { Dashboard } from "../../components/Dashboard";

describe("Test the Dashboard Component", () => {

    // test function, takes a name, and a normal function


    test("Render and read text on the Dashboard Component", () => {
        render(<Dashboard />);

        expect(screen.getByText("Hello User", {exact: false})).toBeInTheDocument();
    });

})