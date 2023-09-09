import css from "./mainPage.module.css"

function MainPage() {
    return (
        <div className={css["main-page-section"]}>
            <h1 align="center">Welcome to the admin panel</h1>
            <p>Here, you can:</p>
            <br />
            <p><b>Check Profiles:</b> Review user and company profiles.</p>
            <br />
            <p><b>Edit Profiles:</b> Make necessary updates to profiles for accuracy.</p>
            <br />
            <p><b>Approve Profiles:</b> Give the green light to new profiles.</p>
            <br />
            <p><b>Delete Profiles:</b> In case of policy violations or other issues.</p>
        </div>
    );
};

export default MainPage;
