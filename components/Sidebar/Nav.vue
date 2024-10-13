<template>
    <nav>
        <div class="nav-group">
            <p class="fontsize-sm">CLÍNICA</p>
            <ul>
                <li class="fontsize-md sidebar-text">
                    <router-link to="/agenda" @click.native="$emit('closeSidebar')"><font-awesome icon="calendar-day" class="sidebar-icons" />Agenda</router-link>
                </li>
                <li class="fontsize-md sidebar-text">
                    <router-link to="/pacientes" @click.native="$emit('closeSidebar')"><font-awesome icon="user-group" class="sidebar-icons" />Pacientes</router-link>
                </li>
                <li class="fontsize-md sidebar-text">
                    <router-link to="/relatorios" @click.native="$emit('closeSidebar')"><font-awesome icon="chart-simple" class="sidebar-icons" />Relatórios</router-link>
                </li>
            </ul>
        </div>
        <div class="nav-group">
            <p class="fontsize-sm">FINANCEIRO</p>
            <ul>
                <li class="fontsize-md sidebar-text">
                    <router-link to="/pagamentos" @click.native="$emit('closeSidebar')"><font-awesome icon="wallet" class="sidebar-icons" />Pagamentos</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
<style scoped>
    .nav-group {
        margin-bottom: var(--space-8);
    }

        .nav-group p {
            color: var(--azul);
            margin-left: var(--space-6);
        }

    ul li {
        border-radius: var(--radius-md);
        cursor: pointer;
        margin: var(--space-1) 0;
        transition: background 0.4s;
    }   

        ul li a {
            padding: var(--space-3);
            padding-left: var(--space-6);
            width: 100%;
            height: 100%;
            display: inline-block;
        }

        ul li:hover {
            background: var(--verde-escuro);
        }

        ul li:hover, ul li:hover .sidebar-icons {
            color: var(--branco);
        }
</style>