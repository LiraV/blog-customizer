import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';
import { useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [applied, setApplied] = useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': applied.fontFamilyOption.value,
					'--font-size': applied.fontSizeOption.value,
					'--font-color': applied.fontColor.value,
					'--container-width': applied.contentWidth.value,
					'--bg-color': applied.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initial={applied}
				onApply={(next) => setApplied(next)}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
