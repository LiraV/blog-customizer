import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect, useRef } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	type ArticleStateType,
	type OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

type Props = {
	initial: ArticleStateType;
	onApply: (next: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ initial, onApply }: Props) => {
	const [draft, setDraft] = useState<ArticleStateType>(initial);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggle = () => setIsMenuOpen((prev) => !prev);

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onChange: setIsMenuOpen,
	});

	useEffect(() => {
		if (isMenuOpen) setDraft(initial);
	}, [isMenuOpen, initial]);

	const update = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => setDraft((prev) => ({ ...prev, [key]: value }));

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(draft);
		setIsMenuOpen(false);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setDraft(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggle} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase align='center'>
						Задайте параметры
					</Text>
					<div className={styles.spacing}></div>
					<Select
						options={fontFamilyOptions}
						selected={draft.fontFamilyOption}
						onChange={(opt: OptionType) => update('fontFamilyOption', opt)}
						title='Шрифт'
					/>
					<div className={styles.spacing}></div>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={draft.fontSizeOption}
						onChange={(opt: OptionType) => update('fontSizeOption', opt)}
						title='Размер шрифта'
					/>
					<div className={styles.spacing}></div>
					<Select
						options={fontColors}
						selected={draft.fontColor}
						onChange={(opt: OptionType) => update('fontColor', opt)}
						title='Цвет шрифта'
					/>
					<div className={styles.spacing}></div>
					<Separator />
					<div className={styles.spacing}></div>
					<Select
						options={backgroundColors}
						selected={draft.backgroundColor}
						onChange={(opt: OptionType) => update('backgroundColor', opt)}
						title='Цвет фона'
					/>
					<div className={styles.spacing}></div>
					<Select
						options={contentWidthArr}
						selected={draft.contentWidth}
						onChange={(opt: OptionType) => update('contentWidth', opt)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
