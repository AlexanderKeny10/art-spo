import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import Parallax from "../../components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import SectionLogin from "./Sections/SectionLogin.js";




import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="artspo"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/bg4.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>artspo</h1>
                <h3 className={classes.subtitle}>
                  A Place Where Creatives, Artists, And The Curious Can Search 
                  For Inspiration. Login To Get Searchin'.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      
      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionLogin />
        <GridItem md={12} className={classes.textCenter}>
          <Link to={"/profile-page"} className={classes.link}>
            <Button color="primary" size="lg" simple>
              About Us
            </Button>
          </Link>
        </GridItem>
      </div>

      <Footer />
    </div>
  );
}
