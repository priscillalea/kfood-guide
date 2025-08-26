// Modal Management System
class ModalManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupModalTriggers();
        this.setupModalClose();
        this.setupModalOutsideClick();
        this.setupEscapeKey();
    }

    setupModalTriggers() {
        // Setup recipe view buttons
        document.querySelectorAll('.view-recipe-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const recipeId = button.getAttribute('data-recipe');
                this.openRecipeModal(recipeId);
            });
        });

        // Setup category tabs
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.filterRecipes(tab.getAttribute('data-category'));
                this.updateActiveTab(tab);
            });
        });
    }

    setupModalClose() {
        const closeBtn = document.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }
    }

    setupModalOutsideClick() {
        const modal = document.getElementById('recipeModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    }

    setupEscapeKey() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openRecipeModal(recipeId) {
        const modal = document.getElementById('recipeModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');

        if (modal && modalTitle && modalContent) {
            // Load recipe content
            const recipeContent = this.getRecipeContent(recipeId);
            modalTitle.textContent = recipeContent.title;
            modalContent.innerHTML = recipeContent.html;

            // Show modal
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Add animation class
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }
    }

    closeModal() {
        const modal = document.getElementById('recipeModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    getRecipeContent(recipeId) {
        const recipes = {
            'kimchi-pancake': {
                title: 'Kimchi Pancake (김치전)',
                html: `
                    <div class="recipe-detail">
                        <div class="recipe-header">
                            <div class="recipe-image">
                                <img src="/placeholder.svg?height=300&width=400" alt="Kimchi Pancake">
                            </div>
                            <div class="recipe-info">
                                <div class="recipe-meta">
                                    <span class="time">⏱️ 15 min</span>
                                    <span class="difficulty">🟢 Fácil</span>
                                    <span class="servings">👥 2-3 porções</span>
                                </div>
                                <div class="recipe-tags">
                                    <span class="tag quick">Rápida</span>
                                    <span class="tag easy">Fácil</span>
                                    <span class="tag traditional">Tradicional</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="recipe-description">
                            <h3>Descrição</h3>
                            <p>Panqueca crocante de kimchi, perfeita para um lanche rápido ou acompanhamento. Esta receita tradicional coreana é fácil de fazer e cheia de sabor.</p>
                        </div>

                        <div class="recipe-ingredients">
                            <h3>Ingredientes</h3>
                            <ul>
                                <li>1 xícara de kimchi picado</li>
                                <li>1 xícara de farinha de trigo</li>
                                <li>1 ovo</li>
                                <li>1/2 xícara de água</li>
                                <li>2 colheres de sopa de óleo vegetal</li>
                                <li>Sal a gosto</li>
                                <li>1 cebolinha picada (opcional)</li>
                            </ul>
                        </div>

                        <div class="recipe-instructions">
                            <h3>Instruções</h3>
                            <ol>
                                <li>Em uma tigela, misture a farinha, ovo e água até formar uma massa lisa.</li>
                                <li>Adicione o kimchi picado e a cebolinha, misturando bem.</li>
                                <li>Aqueça o óleo em uma frigideira antiaderente em fogo médio.</li>
                                <li>Despeje a massa na frigideira, espalhando em formato circular.</li>
                                <li>Cozinhe por 3-4 minutos até a parte inferior ficar dourada.</li>
                                <li>Vire a panqueca e cozinhe por mais 2-3 minutos.</li>
                                <li>Sirva quente, cortada em pedaços.</li>
                            </ol>
                        </div>

                        <div class="recipe-tips">
                            <h3>Dicas</h3>
                            <ul>
                                <li>Use kimchi bem fermentado para mais sabor.</li>
                                <li>Se a massa ficar muito grossa, adicione mais água.</li>
                                <li>Sirva com molho de soja ou gochujang.</li>
                            </ul>
                        </div>

                        <div class="recipe-nutrition">
                            <h3>Informação Nutricional (por porção)</h3>
                            <div class="nutrition-grid">
                                <div class="nutrition-item">
                                    <span class="label">Calorias</span>
                                    <span class="value">180</span>
                                </div>
                                <div class="nutrition-item">
                                    <span class="label">Carboidratos</span>
                                    <span class="value">25g</span>
                                </div>
                                <div class="nutrition-item">
                                    <span class="label">Proteínas</span>
                                    <span class="value">6g</span>
                                </div>
                                <div class="nutrition-item">
                                    <span class="label">Gorduras</span>
                                    <span class="value">8g</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            'korean-hotdog': {
                title: 'Korean Hot Dog (코리안 핫도그)',
                html: `
                    <div class="recipe-detail">
                        <div class="recipe-header">
                            <div class="recipe-image">
                                <img src="/placeholder.svg?height=300&width=400" alt="Korean Hot Dog">
                            </div>
                            <div class="recipe-info">
                                <div class="recipe-meta">
                                    <span class="time">⏱️ 25 min</span>
                                    <span class="difficulty">🟡 Médio</span>
                                    <span class="servings">👥 4 porções</span>
                                </div>
                                <div class="recipe-tags">
                                    <span class="tag modern">Moderna</span>
                                    <span class="tag airfryer">Air Fryer</span>
                                    <span class="tag street">Street Food</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="recipe-description">
                            <h3>Descrição</h3>
                            <p>Hot dog coreano crocante feito na air fryer, com batata ralada e molho especial. Uma versão moderna da popular street food coreana.</p>
                        </div>

                        <div class="recipe-ingredients">
                            <h3>Ingredientes</h3>
                            <ul>
                                <li>4 salsichas de sua preferência</li>
                                <li>4 palitos de sorvete</li>
                                <li>2 batatas médias, raladas</li>
                                <li>1 xícara de farinha de trigo</li>
                                <li>1 ovo</li>
                                <li>1/2 xícara de água</li>
                                <li>Sal e pimenta a gosto</li>
                                <li>Óleo de cozinha</li>
                            </ul>
                        </div>

                        <div class="recipe-instructions">
                            <h3>Instruções</h3>
                            <ol>
                                <li>Enxugue as batatas raladas com papel toalha para remover excesso de água.</li>
                                <li>Misture farinha, ovo, água, sal e pimenta para formar uma massa.</li>
                                <li>Adicione as batatas raladas à massa.</li>
                                <li>Enfie os palitos nas salsichas.</li>
                                <li>Passe cada salsicha na massa, cobrindo completamente.</li>
                                <li>Coloque na air fryer a 180°C por 8-10 minutos.</li>
                                <li>Vire e cozinhe por mais 5-7 minutos até ficar dourado.</li>
                                <li>Sirva com ketchup, mostarda ou molho especial.</li>
                            </ol>
                        </div>

                        <div class="recipe-tips">
                            <h3>Dicas</h3>
                            <ul>
                                <li>Use batatas bem secas para uma cobertura mais crocante.</li>
                                <li>Se não tiver air fryer, pode fritar em óleo quente.</li>
                                <li>Experimente diferentes tipos de salsichas.</li>
                            </ul>
                        </div>
                    </div>
                `
            },
            'bibimbap-bowl': {
                title: 'Bibimbap Rápido (빠른 비빔밥)',
                html: `
                    <div class="recipe-detail">
                        <div class="recipe-header">
                            <div class="recipe-image">
                                <img src="/placeholder.svg?height=300&width=400" alt="Quick Bibimbap Bowl">
                            </div>
                            <div class="recipe-info">
                                <div class="recipe-meta">
                                    <span class="time">⏱️ 20 min</span>
                                    <span class="difficulty">🟢 Fácil</span>
                                    <span class="servings">👥 1-2 porções</span>
                                </div>
                                <div class="recipe-tags">
                                    <span class="tag quick">Rápida</span>
                                    <span class="tag easy">Fácil</span>
                                    <span class="tag healthy">Saudável</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="recipe-description">
                            <h3>Descrição</h3>
                            <p>Versão simplificada do bibimbap tradicional, perfeita para uma refeição rápida e nutritiva. Colorido, saboroso e cheio de nutrientes.</p>
                        </div>

                        <div class="recipe-ingredients">
                            <h3>Ingredientes</h3>
                            <ul>
                                <li>1 xícara de arroz cozido</li>
                                <li>1 cenoura ralada</li>
                                <li>1 pepino em rodelas</li>
                                <li>1 ovo frito</li>
                                <li>1/4 xícara de kimchi</li>
                                <li>1 colher de sopa de gochujang</li>
                                <li>1 colher de chá de óleo de gergelim</li>
                                <li>Gergelim torrado para decorar</li>
                            </ul>
                        </div>

                        <div class="recipe-instructions">
                            <h3>Instruções</h3>
                            <ol>
                                <li>Prepare o arroz conforme as instruções da embalagem.</li>
                                <li>Rale a cenoura e corte o pepino em rodelas finas.</li>
                                <li>Frite o ovo em uma frigideira antiaderente.</li>
                                <li>Em uma tigela, coloque o arroz como base.</li>
                                <li>Organize os vegetais em seções ao redor do arroz.</li>
                                <li>Coloque o ovo no centro.</li>
                                <li>Adicione o kimchi e o gochujang.</li>
                                <li>Regue com óleo de gergelim e polvilhe gergelim torrado.</li>
                                <li>Misture tudo antes de comer.</li>
                            </ol>
                        </div>

                        <div class="recipe-tips">
                            <h3>Dicas</h3>
                            <ul>
                                <li>Use arroz de grão curto para melhor textura.</li>
                                <li>Pode adicionar outros vegetais de sua preferência.</li>
                                <li>O gochujang pode ser substituído por pasta de pimenta.</li>
                            </ul>
                        </div>
                    </div>
                `
            },
            'korean-fried-chicken': {
                title: 'Frango Frito Coreano (양념치킨)',
                html: `
                    <div class="recipe-detail">
                        <div class="recipe-header">
                            <div class="recipe-image">
                                <img src="/placeholder.svg?height=300&width=400" alt="Korean Fried Chicken">
                            </div>
                            <div class="recipe-info">
                                <div class="recipe-meta">
                                    <span class="time">⏱️ 35 min</span>
                                    <span class="difficulty">🟡 Médio</span>
                                    <span class="servings">👥 4 porções</span>
                                </div>
                                <div class="recipe-tags">
                                    <span class="tag modern">Moderna</span>
                                    <span class="tag airfryer">Air Fryer</span>
                                    <span class="tag spicy">Picante</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="recipe-description">
                            <h3>Descrição</h3>
                            <p>Frango crocante e saboroso feito na air fryer, com molho doce e picante tradicional. Uma versão mais saudável do famoso frango frito coreano.</p>
                        </div>

                        <div class="recipe-ingredients">
                            <h3>Ingredientes</h3>
                            <ul>
                                <li>500g de peito de frango em cubos</li>
                                <li>1 xícara de farinha de trigo</li>
                                <li>1 ovo</li>
                                <li>1/2 xícara de leite</li>
                                <li>2 colheres de sopa de gochujang</li>
                                <li>1 colher de sopa de mel</li>
                                <li>1 colher de sopa de óleo de gergelim</li>
                                <li>Sal e pimenta a gosto</li>
                            </ul>
                        </div>

                        <div class="recipe-instructions">
                            <h3>Instruções</h3>
                            <ol>
                                <li>Tempere o frango com sal e pimenta.</li>
                                <li>Misture farinha, ovo e leite para formar uma massa.</li>
                                <li>Passe o frango na massa.</li>
                                <li>Coloque na air fryer a 180°C por 12-15 minutos.</li>
                                <li>Vire e cozinhe por mais 5-7 minutos.</li>
                                <li>Misture gochujang, mel e óleo de gergelim para o molho.</li>
                                <li>Regue o frango com o molho e sirva.</li>
                            </ol>
                        </div>

                        <div class="recipe-tips">
                            <h3>Dicas</h3>
                            <ul>
                                <li>Deixe o frango marinar por 30 minutos para mais sabor.</li>
                                <li>Use asas de frango para uma versão mais tradicional.</li>
                                <li>O molho pode ser ajustado para mais ou menos picante.</li>
                            </ul>
                        </div>
                    </div>
                `
            },
            'kimchi-fried-rice': {
                title: 'Arroz Frito com Kimchi (김치볶음밥)',
                html: `
                    <div class="recipe-detail">
                        <div class="recipe-header">
                            <div class="recipe-image">
                                <img src="/placeholder.svg?height=300&width=400" alt="Kimchi Fried Rice">
                            </div>
                            <div class="recipe-info">
                                <div class="recipe-meta">
                                    <span class="time">⏱️ 15 min</span>
                                    <span class="difficulty">🟢 Fácil</span>
                                    <span class="servings">👥 2 porções</span>
                                </div>
                                <div class="recipe-tags">
                                    <span class="tag quick">Rápida</span>
                                    <span class="tag easy">Fácil</span>
                                    <span class="tag traditional">Tradicional</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="recipe-description">
                            <h3>Descrição</h3>
                            <p>Arroz frito picante e saboroso com kimchi, ovo e vegetais. Prato perfeito para sobras e uma refeição rápida e nutritiva.</p>
                        </div>

                        <div class="recipe-ingredients">
                            <h3>Ingredientes</h3>
                            <ul>
                                <li>2 xícaras de arroz cozido (de preferência do dia anterior)</li>
                                <li>1/2 xícara de kimchi picado</li>
                                <li>1 ovo</li>
                                <li>1 cebola pequena picada</li>
                                <li>1 colher de sopa de óleo de gergelim</li>
                                <li>1 colher de chá de gochujang</li>
                                <li>Sal a gosto</li>
                                <li>Gergelim torrado para decorar</li>
                            </ul>
                        </div>

                        <div class="recipe-instructions">
                            <h3>Instruções</h3>
                            <ol>
                                <li>Aqueça o óleo em uma frigideira grande em fogo alto.</li>
                                <li>Frite a cebola até ficar transparente.</li>
                                <li>Adicione o kimchi e frite por 2 minutos.</li>
                                <li>Adicione o arroz e misture bem.</li>
                                <li>Faça um espaço no centro e quebre o ovo.</li>
                                <li>Misture o ovo com o arroz.</li>
                                <li>Adicione gochujang e sal a gosto.</li>
                                <li>Sirva quente com gergelim torrado.</li>
                            </ol>
                        </div>

                        <div class="recipe-tips">
                            <h3>Dicas</h3>
                            <ul>
                                <li>Use arroz do dia anterior para melhor textura.</li>
                                <li>O kimchi bem fermentado dá mais sabor.</li>
                                <li>Pode adicionar outros vegetais ou proteínas.</li>
                            </ul>
                        </div>
                    </div>
                `
            },
            'korean-bbq-bowl': {
                title: 'Korean BBQ Bowl (불고기 보울)',
                html: `
                    <div class="recipe-detail">
                        <div class="recipe-header">
                            <div class="recipe-image">
                                <img src="/placeholder.svg?height=300&width=400" alt="Korean BBQ Bowl">
                            </div>
                            <div class="recipe-info">
                                <div class="recipe-meta">
                                    <span class="time">⏱️ 30 min</span>
                                    <span class="difficulty">🟡 Médio</span>
                                    <span class="servings">👥 2 porções</span>
                                </div>
                                <div class="recipe-tags">
                                    <span class="tag modern">Moderna</span>
                                    <span class="tag healthy">Saudável</span>
                                    <span class="tag fusion">Fusão</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="recipe-description">
                            <h3>Descrição</h3>
                            <p>Bowl moderno inspirado no bulgogi tradicional, com arroz, vegetais e carne marinada. Uma refeição equilibrada e cheia de sabor.</p>
                        </div>

                        <div class="recipe-ingredients">
                            <h3>Ingredientes</h3>
                            <ul>
                                <li>200g de carne bovina em tiras finas</li>
                                <li>2 xícaras de arroz cozido</li>
                                <li>1 cenoura ralada</li>
                                <li>1 pepino em rodelas</li>
                                <li>1 ovo frito</li>
                                <li>2 colheres de sopa de molho de soja</li>
                                <li>1 colher de sopa de óleo de gergelim</li>
                                <li>1 colher de chá de açúcar</li>
                                <li>Gergelim torrado</li>
                            </ul>
                        </div>

                        <div class="recipe-instructions">
                            <h3>Instruções</h3>
                            <ol>
                                <li>Marine a carne com molho de soja, óleo de gergelim e açúcar por 15 minutos.</li>
                                <li>Frite a carne em uma frigideira antiaderente até ficar dourada.</li>
                                <li>Prepare o arroz conforme as instruções da embalagem.</li>
                                <li>Em uma tigela, coloque o arroz como base.</li>
                                <li>Organize a carne e os vegetais em seções.</li>
                                <li>Coloque o ovo no centro.</li>
                                <li>Polvilhe com gergelim torrado e sirva.</li>
                            </ol>
                        </div>

                        <div class="recipe-tips">
                            <h3>Dicas</h3>
                            <ul>
                                <li>Use carne de boa qualidade para melhor resultado.</li>
                                <li>Pode usar frango ou porco como alternativa.</li>
                                <li>Adicione gochujang para mais sabor.</li>
                            </ul>
                        </div>
                    </div>
                `
            }
        };

        return recipes[recipeId] || {
            title: 'Receita não encontrada',
            html: '<p>Esta receita ainda não está disponível. Volte em breve!</p>'
        };
    }

    filterRecipes(category) {
        const recipeCards = document.querySelectorAll('.recipe-card');
        
        recipeCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategories.includes(category)) {
                card.style.display = 'block';
                card.classList.add('visible');
            } else {
                card.style.display = 'none';
                card.classList.remove('visible');
            }
        });
    }

    updateActiveTab(activeTab) {
        // Remove active class from all tabs
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Add active class to clicked tab
        activeTab.classList.add('active');
    }
}

// Initialize modal manager
document.addEventListener('DOMContentLoaded', () => {
    new ModalManager();
});

// Export for global access
window.modalManager = new ModalManager();
