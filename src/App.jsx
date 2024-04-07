import {
  Button,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  Spinner,
  Card,
} from "@material-tailwind/react";
import React from "react";
import { MY_THEMES } from "./theme";

function App() {
  const [currentTheme, setCurrentTheme] = React.useState("");
  const [themeList, setThemeList] = React.useState(MY_THEMES.slice());
  const [randomizing, setRandomizing] = React.useState(false);

  const randomizeTheme = () => {
    if (!randomizing && themeList.length > 0) {
      setRandomizing(true);
      const randomIndex = Math.floor(Math.random() * themeList.length);
      setCurrentTheme(themeList[randomIndex]);

      const updatedThemeList = [
        ...themeList.slice(0, randomIndex),
        ...themeList.slice(randomIndex + 1),
      ];
      setThemeList(updatedThemeList);

      setTimeout(() => {
        setRandomizing(false);
      }, 1000);
    } else if (themeList.length === 0) {
      setCurrentTheme("");
      setThemeList(MY_THEMES);
    }
  };

  return (
    <div>
      <header className="flex items-center justify-end">
        <DrawerDefault themes={themeList} />
      </header>

      <div className="flex flex-col justify-center items-center gap-10">
        <Typography variant="h1" color="blue-gray" className="text-center">
          Randomize your themes
        </Typography>

        {/* Display loading text when randomizing */}
        {randomizing && (
          <div className="flex items-center gap-2 animate-bounce">
            <Spinner className="w-10 h-10" />
          </div>
        )}

        {/* Display theme at here */}
        {!randomizing && (
          <Typography
            variant="h3"
            color="blue-gray"
            className={`${
              currentTheme === ""
                ? ""
                : "p-5 border-2 rounded-lg border-blue-gray-900"
            } text-center capitalize`}
          >
            {currentTheme}
          </Typography>
        )}

        <Button size="lg" variant="gradient" onClick={randomizeTheme}>
          Start Randomize
        </Button>
      </div>
    </div>
  );
}

export default App;

function DrawerDefault({ themes = [] }) {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <React.Fragment>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Drawer
        placement="right"
        open={open}
        onClose={closeDrawer}
        size={400}
        className="p-4 overflow-y-auto"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            List themes
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <Card>
          <List>
            {themes.map((item) => (
              <ListItem className="capitalize" key={item}>
                {item}
              </ListItem>
            ))}
          </List>
        </Card>
      </Drawer>
    </React.Fragment>
  );
}
