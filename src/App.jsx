import React, { createContext, useContext, useState } from 'react';

// ����� ��� �����-����������� �������
const styles = {
    app: {
        display: 'flex', // ���������� flexbox
        justifyContent: 'flex-end', // ����������� ���������� ������
        alignItems: 'center', // ���������� ���������� �� ���������
        minHeight: '100vh',
        padding: '20px',
        color: 'white',
        backgroundColor: 'black',
        fontFamily: 'Arial, sans-serif',
    },
    // ��������� ����� �� ����������
    header: {
        color: 'violet',
    },
    main: {
        backgroundColor: '#2C2C2C',
        border: '1px solid violet',
        padding: '20px',
        borderRadius: '5px',
        width: '100%', 
        minHeight: '90vh',
        margin: '0 20px 0 0', // ������ ������, ����� �� ��������� � ���� ������
    },
    profile: {
        backgroundColor: '#3E3E3E',
        border: '1px solid violet',
        padding: '20px',
        borderRadius: '5px',
        width: '100%', 
        minHeight: '90vh',
        margin: '0 20px 20px 0', // ������ ����� � ������
    },
    loginPage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
        width: '100%'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        border: '1px solid violet',
        borderRadius: '5px',
        backgroundColor: '#2C2C2C',
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid violet',
        backgroundColor: '#3E3E3E',
        color: 'white',
    },
    loginButton: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: 'violet',
        color: 'white',
        cursor: 'pointer',
    }
};


// ������� �������� ��� ���������� ������������
const AuthContext = createContext();

// ��� ��� ������������� ��������� �����������
const useAuth = () => useContext(AuthContext);

// ������� ��������
class MainPage extends React.Component {
    render() {
        return (
            <div style={styles.main}>
                {/* ���������� ������ � ������� ����� */}
                <div style={{ width: '100%', textAlign: 'right' }}>
                    <button onClick={this.props.goToProfile} style={{ marginBottom: '10px' }}>Go to profile</button>
                </div>
                <h1 style={styles.header}>Welcome to the home page!</h1>
                <p>This is the main content of the page.</p>
            </div>
        );
    }
}


// �������� �������
class ProfilePage extends React.Component {
    render() {
        return (
            <div style={styles.profile}>
                {/* ���������� ������ � ������� ����� */}
                <div style={{ width: '100%', textAlign: 'right' }}>
                    <button onClick={this.props.goToMain} style={{ marginBottom: '10px' }}>To Home page</button>
                </div>
                <h1 style={styles.header}>Your profile</h1>
                <p>Information about your profile:</p>
                <p>Login:</p>
                <p>Password:</p>
                <p>Registration date:</p>
            </div>
        );
    }
}

const LoginPage = ({ onLogin }) => {
    return (
        <div style={styles.loginPage}>
            <div style={styles.formContainer}>
                <input
                    type="text"
                    placeholder="Login"
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                />
                <button onClick={onLogin} style={styles.loginButton}>Login / Register</button>
            </div>
        </div>
    );
};


// ��������� ��� ��������� ���������� �������
const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentPage, setCurrentPage] = useState('main'); // main ��� profile

    const goToProfile = () => setCurrentPage('profile');
    const goToMain = () => setCurrentPage('main');

    const handleLogin = () => {
        setIsAuthenticated(true); 
    };

    const renderPage = () => {
        if (!isAuthenticated) {
            return <LoginPage onLogin={handleLogin} />;
        } else {
            switch (currentPage) {
                case 'main':
                    return <MainPage goToProfile={goToProfile} />;
                case 'profile':
                    return <ProfilePage goToMain={goToMain} />;
                default:
                    return <MainPage goToProfile={goToProfile} />;
            }
        }
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <div style={styles.app}>
                {renderPage()}
            </div>
        </AuthContext.Provider>
    );
};

export default App;
