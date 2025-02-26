#!/bin/bash

# 检查是否已安装 kubeadm
if command -v kubeadm &> /dev/null; then
    echo "kubeadm is already installed."
    kubeadm version
    exit 0
fi

# 检查操作系统
OS=$(uname)

case $OS in
    Linux)
        # 检测 Linux 发行版
        DISTRO=$(cat /etc/*release | grep ^ID= | cut -d'=' -f2 | tr -d '"')
        
        case $DISTRO in
            ubuntu)
                echo "Detected Ubuntu. Installing Kubernetes components..."
                sudo apt-get update
                sudo apt-get install -y apt-transport-https ca-certificates curl
                curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
                echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
                sudo apt-get update
                sudo apt-get install -y kubelet kubeadm kubectl
                sudo systemctl enable kubelet
                ;;
            centos)
                echo "Detected CentOS. Installing Kubernetes components..."
                cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
                [kubernetes]
                name=Kubernetes
                baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
                enabled=1
                gpgcheck=1
                gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg
                https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF
                sudo yum install -y kubelet kubeadm kubectl
                sudo systemctl enable kubelet
                ;;
            *)
                echo "Unsupported Linux distribution: $DISTRO"
                echo "Please install Kubernetes manually."
                exit 1
                ;;
        esac
        ;;
    Darwin)
        echo "Detected macOS. Please install Docker Desktop from:"
        echo "https://www.docker.com/products/docker-desktop"
        echo "After installing Docker Desktop, enable Kubernetes in the settings."
        ;;
    *Microsoft*)
        echo "Detected Windows. Please install Docker Desktop from:"
        echo "https://www.docker.com/products/docker-desktop"
        echo "After installing Docker Desktop, enable Kubernetes in the settings."
        ;;
    *)
        echo "Unsupported OS: $OS"
        echo "Please install Kubernetes manually."
        exit 1
        ;;
esac

# 初始化 Kubernetes 控制平面（仅适用于 Linux）
if [ "$OS" == "Linux" ]; then
    echo "Initializing Kubernetes control plane..."
    sudo kubeadm init --pod-network-cidr=192.168.0.0/16

    # 配置 kubectl
    echo "Configuring kubectl..."
    mkdir -p $HOME/.kube
    sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
    sudo chown $(id -u):$(id -g) $HOME/.kube/config

    # 安装网络插件（例如 Calico）
    echo "Installing Calico network plugin..."
    kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml

    # 提示用户加入工作节点的命令
    echo "To join worker nodes to the cluster, run the following command on each worker node:"
    kubeadm token create --print-join-command
fi