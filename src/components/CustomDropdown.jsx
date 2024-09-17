import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import CustomText from "../utils/CustomText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getColors } from "../utils/colors";
import { useTheme } from "../utils/ThemeContext";

const CustomDropdown = ({ title, placeholder, value, error, onSelect }) => {
  const { theme } = useTheme(); // Access theme
  const { BG_COLOR, TEXT_COLOR } = getColors(theme);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "90%",
      height: verticalScale(40),
      borderWidth: 0.5,
      alignSelf: "center",
      marginTop: moderateVerticalScale(11),
      marginBottom: moderateVerticalScale(11),
      borderRadius: scale(10),
      paddingLeft: moderateScale(15),
      paddingRight: moderateScale(15),
      justifyContent: "center",
      backgroundColor: BG_COLOR,
      borderColor: TEXT_COLOR,
    },
    inputTitle: {
      position: "absolute",
      top: -moderateVerticalScale(9),
      left: moderateScale(13),
      backgroundColor: BG_COLOR,
      paddingHorizontal: moderateScale(5),
      fontSize: moderateScale(13),
      color: TEXT_COLOR,
    },
    inputText: {
      color: TEXT_COLOR,
      flex: 1,
      textAlign: "left",
      marginRight: moderateScale(15),
      marginLeft: moderateScale(5),
      fontSize: moderateScale(13),
      fontFamily: "Poppins_400Regular",
    },
    icon: {
      fontSize: 24,
      position: "absolute",
      right: 10,
      color: TEXT_COLOR,
    },
    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    dropdownContainer: {
      width: "80%",
      backgroundColor: BG_COLOR,
      borderRadius: 10,
      padding: 10,
      maxHeight: "70%",
    },
    dropdownItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: TEXT_COLOR,
    },
    dropdownText: {
      fontSize: 16,
      color: TEXT_COLOR,
    },
  });
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSelect = (item) => {
    onSelect(item);
    setIsDropdownVisible(false);
  };

  const errorStyle = error ? { borderColor: "red", borderWidth: 1.2 } : {};
  const errorTitle = error ? { color: "red" } : {};

  return (
    <View>
      <TouchableOpacity onPress={toggleDropdown}>
        <View style={[styles.inputContainer, errorStyle]}>
          <CustomText style={[styles.inputTitle, errorTitle]}>
            {title}
          </CustomText>
          <CustomText style={[styles.inputText, { flexGrow: 1 }]}>
            {value || placeholder}
          </CustomText>
          <MaterialIcons name="arrow-drop-down" style={styles.icon} />
        </View>
      </TouchableOpacity>

      {isDropdownVisible && (
        <Modal transparent={true} animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.dropdownContainer}>
              <ScrollView>
                {Profiles &&
                  Profiles.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => handleSelect(item.category)}
                    >
                      <CustomText style={styles.dropdownText}>
                        {item.category}
                      </CustomText>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export const Profiles = [
  {
    category: "Web Development",
    keywords: [
      ["Chief Technology Officer"],
      ["CTO"],
      ["R&D"],
      ["Architect"],
      ["Database", "Administrator"],
      ["Information", "Technology"],
      ["IT", "Manager"],
      ["IT", "Specialist"],
      ["IT", "Administrator"],
      ["Software", "Engineer"],
      ["Programmer"],
      ["Developer"],
      ["Coder"],
      ["Backend"],
      ["Frontend"],
      ["Back end"],
      ["Front end"],
      ["Web", "Developer"],
      ["Web", "Engineer"],
      ["SEO"],
      ["Python"],
      ["Django"],
      ["Ruby"],
      ["Rails"],
      ["PHP"],
      ["JavaScript"],
      ["React"],
      ["ReactJS"],
      ["Angular"],
      ["AngularJS"],
      ["JS"],
      ["Java"],
      ["HTML"],
      ["CSS"],
      ["C#"],
      ["C++"],
      ["SQL"],
      ["MySQL"],
      ["Quality", "Assurance"],
      ["QA"],
    ],
  },
  {
    category: "Mobile Development",
    keywords: [
      ["Chief Technology Officer"],
      ["CTO"],
      ["R&D"],
      ["Architect"],
      ["Mobile", "Engineer"],
      ["Software", "Engineer"],
      ["Information", "Technology"],
      ["IT", "Manager"],
      ["IT", "Specialist"],
      ["IT", "Administrator"],
      ["Programmer"],
      ["Developer"],
      ["Coder"],
      ["Objective C"],
      ["Swift"],
      ["Java"],
      ["iOS"],
      ["Android"],
      ["Cordova"],
      ["Phonegap"],
      ["React Native"],
      ["Ionic"],
      ["Xcode"],
      ["Quality", "Assurance"],
      ["QA"],
      ["Webmaster"],
    ],
  },
  {
    category: "Data Science",
    keywords: [
      ["Chief Technology Officer"],
      ["CTO"],
      ["Data Science"],
      ["Data Scientist"],
      ["Machine", "Learning"],
      ["Deep", "Learning"],
      ["Analytics"],
      ["Analyst"],
      ["Algebra"],
      ["Probability", "theory"],
      ["Statistics"],
      ["Math"],
      ["Mathematician"],
      ["Kaggle"],
      ["Spark"],
      ["Singa"],
      ["Hadoop"],
      ["Tensorflow"],
      ["Theano"],
      ["Torch"],
      ["Caffe"],
      ["CNTK"],
      ["MLlib"],
      ["Keras"],
      ["MXNet"],
      ["scikit"],
      ["Azure ML"],
      ["ML Studio"],
      ["R&D"],
    ],
  },
  {
    category: "Design",
    keywords: [
      ["Design"],
      ["Designer"],
      ["Creative", "Director"],
      ["Creative", "Head"],
      ["Creative", "Lead"],
      ["Art", "Director"],
      ["UI"],
      ["UX"],
      ["Art", "Manager"],
      ["Brand", "Identity"],
      ["Logo"],
      ["Illustrator"],
      ["Illustration"],
      ["Artist"],
      ["Artworker"],
      ["User", "Interface"],
      ["User", "Experience"],
      ["Prototyping"],
      ["Prototype"],
      ["Photoshop"],
      ["Sketch"],
      ["InDesign"],
      ["Adobe"],
    ],
  },
  {
    category: "Public Relations",
    keywords: [
      ["CEO"],
      ["Chief Executive Officer"],
      ["Communications"],
      ["Marketing"],
      ["Brand"],
      ["Branding"],
      ["Content", "Manager"],
      ["Content", "Strategist"],
      ["Copy", "Writer"],
      ["Public", "Affairs"],
      ["Public", "Relations"],
      ["Event", "Coordinator"],
      ["Event", "Manager"],
      ["Social", "Media"],
      ["Media", "Director"],
      ["Media", "Coordinator"],
      ["Relationship", "Manager"],
      ["Media", "Relations"],
      ["Media", "Coordinator"],
      ["Media", "Director"],
      ["Media", "Specialist"],
    ],
  },
  {
    category: "Marketing",
    keywords: [
      ["CEO"],
      ["Chief Executive Officer"],
      ["Marketing"],
      ["Marketer"],
      ["Account", "Coordinator"],
      ["Account", "Executive"],
      ["Advertising"],
      ["Ads"],
      ["Advert"],
      ["Art", "Director"],
      ["Assistant", "Director"],
      ["Brand"],
      ["Branding"],
      ["Product", "Manager"],
      ["Business", "Development"],
      ["Communications"],
      ["Content", "Manager"],
      ["Content", "Writer"],
      ["Community", "Manager"],
      ["Copywriter"],
      ["Creative", "Assistant"],
      ["Creative", "Director"],
      ["Market", "Research"],
      ["Media", "Assistant"],
      ["Media", "Buyer"],
      ["Media", "Director"],
      ["Media", "Planner"],
      ["Media", "Researcher"],
      ["Media", "Relations"],
      ["Promotion"],
      ["Promotions"],
      ["Public", "Relations"],
      ["Publicity"],
      ["SEO"],
      ["Ecommerce"],
      ["E commerce"],
      ["PMM"],
    ],
  },
  {
    category: "Human Resources",
    keywords: [
      ["HR"],
      ["Human Resources"],
      ["Talent"],
      ["Recruiter"],
      ["Recruiting"],
      ["Administrative"],
      ["Employee", "Relations"],
      ["HRD"],
      ["Sourcing"],
      ["Staffing"],
    ],
  },
  {
    category: "Sales & Business Development",
    keywords: [
      ["CEO"],
      ["Chief Executive Officer"],
      ["Sales"],
      ["Salesperson"],
      ["Salesman"],
      ["Dealer"],
      ["Business", "Development"],
      ["Business", "Manager"],
      ["Market", "Development"],
      ["Account", "Manager"],
      ["Account", "Director"],
      ["Account", "Representative"],
      ["Client", "Relationship"],
      ["Customer", "Relationship"],
      ["Customer", "Success"],
      ["Customer", "Care"],
      ["Telesales"],
      ["Brand", "Ambassador"],
      ["Industry", "Representative"],
      ["Retail"],
    ],
  },
  {
    category: "Finance & Accounting",
    keywords: [
      ["Accounting"],
      ["Accountant"],
      ["Financial"],
      ["Finance"],
      ["Auditor"],
      ["Audit"],
      ["Bookkeeper"],
      ["Budget"],
      ["Payroll"],
      ["Tax"],
    ],
  },
  {
    category: "Product Management",
    keywords: [
      ["Project", "Management"],
      ["Product", "Management"],
      ["Project", "Manager"],
      ["Product", "Manager"],
      ["Team", "Lead"],
      ["Scrum"],
      ["Kanban"],
      ["PM"],
      ["PMM"],
      ["CEO"],
      ["CTO"],
      ["Chief Executive Officer"],
      ["Chief Technology Officer"],
      ["R&D"],
    ],
  },
  {
    category: "Startups",
    keywords: [],
  },
];

export default CustomDropdown;
