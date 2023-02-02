import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import { useContent } from '../providers/ArticleProvider';
import { useAuth } from '../providers/AuthProvider';
import TemplateMain from '../templates/TemplateMain';

const Home = ({ navigation }) => {
	const fetching = 'all';
	const { user } = useAuth();
	const { state, getContent, incrementPagination } = useContent();

	useEffect(() => {
		getContent(fetching, state[fetching].pagination);
	}, [state[fetching].pagination]);

	return (
		<TemplateMain
			style={styles.Home}
			navigation={navigation}
			title={user?.name ? `Hey ${user.name}!` : 'Latest Updates'}
			carousel={state.all.data.filter((post) => post.article.featured)}
			onRefresh={() => getContent(fetching, state.all.pagination)}
			onEndReach={() => incrementPagination(fetching)}
		>
			<Feed navigation={navigation} fetchOption={fetching} />
		</TemplateMain>
	);
};

export default Home;

const styles = StyleSheet.create({
	Home: {},
});
